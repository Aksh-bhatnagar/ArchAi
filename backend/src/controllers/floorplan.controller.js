import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Floorplan } from "../models/floorplan.model.js"
import GenAI from "../connections/Ai/gemini.js";

const generator = asyncHandler(async (req, res) => {

    //get data from frontend
    //validate data
    //store to mongoose
    //send json data to ai
    //retreave svg data from ai
    //display or send to frontend
    //clear mongoose
    const { propertyData, projectName } = req.body;

    if (!propertyData) {
        throw new ApiError(400, "Please fill property data")
    }

    const userId = req.user._id; // from verifyJWT middleware

    const floorplan = await Floorplan.create({
        owner: userId,
        projectName,
        ...propertyData
    });


    const prompt =
        `You are a deterministic architectural SVG generator.

You MUST follow ONE fixed SVG structure. NO creativity.

========================
INPUT
========================
${JSON.stringify(propertyData, null, 2)}

========================
GLOBAL RULES
========================

1. OUTPUT:
- ONLY raw SVG
- NO explanations
- NO comments
- NO <style>, NO <defs>
- ONLY inline attributes

2. SCALE:
1 foot = 10 pixels

3. SVG ROOT:
<svg viewBox="0 0 W H" xmlns="http://www.w3.org/2000/svg">

W = plot.width*10 + 20  
H = plot.length*10 + 20  

4. ALWAYS USE THESE ELEMENT TYPES ONLY:
- <rect> → rooms + plot
- <line> → walls
- <path> → doors ONLY (arc)
- <text> → labels

DO NOT use:
- <defs>
- <style>
- <g> (except north arrow)
- random classes

========================
DRAWING RULES
========================

PLOT:
- One outer rect (light stroke)

HOUSE:
- One outer rect (black thick stroke)

ROOMS:
- Each room MUST be a <rect>
- Must NOT overlap
- Must fit inside house
- Must have label centered

WALLS:
- Internal walls = <line stroke-width="2">

========================
DOORS (CRITICAL)
========================

Each room MUST have AT LEAST ONE DOOR.

Door = 2 parts:
1. Wall gap (missing line segment)
2. Arc:
<path d="M x y A 30 30 0 0 1 x y" stroke="black" fill="none"/>

- Door width = 30px (3 ft)
- MUST connect rooms logically
- EVERY room must be reachable from Living room

========================
WINDOWS
========================

Window = EXACTLY TWO PARALLEL LINES

Example:
<line x1="" y1="" x2="" y2="" stroke="black" stroke-width="1"/>
<line x1="" y1="" x2="" y2="" stroke="black" stroke-width="1"/>

- Place at least ONE window per room
- MUST be on outer walls ONLY

========================
LABELS
========================

Format EXACTLY:
ROOM_NAME (W' x H')

Centered using:
text-anchor="middle"
dominant-baseline="middle"

========================
NORTH ARROW
========================

Top-right corner ONLY:

<g transform="translate(W-40,40)">
  <line x1="0" y1="0" x2="0" y2="20" stroke="black"/>
  <path d="M -5 5 L 0 0 L 5 5 Z" fill="black"/>
  <text x="0" y="30" font-size="10" text-anchor="middle">N</text>
</g>

========================
VALIDATION (MANDATORY)
========================

Before output, ENSURE:

✔ At least 1 <rect>
✔ At least 4 rooms
✔ Every room has:
   - 1 door
   - 1 window
✔ All rooms connected via doors
✔ No zero-length lines
✔ No overlapping rooms

If ANY rule fails → REGENERATE

========================
FINAL OUTPUT
========================

Return ONLY SVG
`


    const response = await GenAI(prompt);

    if (!response || !response.text || !response.text.includes("<svg")) {
        throw new ApiError(500, "AI failed to generate valid SVG");
    }

    floorplan.svg = response.text;
    await floorplan.save();

    return res.status(201).json(
        new ApiResponse(200, { projectId: floorplan._id, svg: response.text }, "floorplan generated successfully")
    )
})

const getMyFloorplans = asyncHandler(async (req, res) => {

    const floorplans = await Floorplan.find({
        owner: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, floorplans, "User floorplans fetched successfully")
    );
});

const getFloorplanById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const floorplan = await Floorplan.findById(id);
    if (!floorplan) {
        throw new ApiError(404, "Floorplan not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, floorplan, "Floorplan fetched successfully"));
});

const deleteFloorplan = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const floorplan = await Floorplan.findOneAndDelete({
        _id: id,
        owner: req.user._id
    });

    if (!floorplan) {
        throw new ApiError(404, "Floorplan not found or unauthorized");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Floorplan deleted successfully")
    );
});

const renameFloorplan = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { projectName } = req.body;

    if (!projectName) {
        throw new ApiError(400, "Project name is required");
    }

    const updated = await Floorplan.findOneAndUpdate(
        { _id: id, owner: req.user._id },
        { projectName },
        { new: true }
    );

    if (!updated) {
        throw new ApiError(404, "Floorplan not found or unauthorized");
    }

    return res.status(200).json(
        new ApiResponse(200, updated, "Project renamed successfully")
    );
});

const downloadSvg = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const floorplan = await Floorplan.findOne({
        _id: id,
        owner: req.user._id
    });

    if (!floorplan) {
        throw new ApiError(404, "Floorplan not found or unauthorized");
    }

    if (!floorplan.svg) {
        throw new ApiError(400, "SVG not available");
    }

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${floorplan.projectName}.svg"`
    );

    res.send(floorplan.svg);
});


export { generator, getMyFloorplans, deleteFloorplan, renameFloorplan, downloadSvg ,getFloorplanById} 