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
        `You are an architectural floorplan generator. 
Using ONLY the JSON data below, generate a COMPLETE, VALID SVG floorplan.

JSON Input:
${JSON.stringify(propertyData, null, 2)}

========================
MANDATORY SVG RULES
========================

1. OUTPUT FORMAT:
- Output ONLY raw SVG.
- Must start with <svg ...> and end with </svg>.
- NO markdown, NO code blocks, NO explanations, NO text outside SVG.

2. PLOT:
- Use plot.width and plot.length from JSON.
- Scale: 1 foot = 10 pixels.
- Convert plot.width → width_px and plot.length → height_px.

3. ROOMS (AUTO-CALCULATE):
Based on JSON:
- house.living
- house.kitchen
- house.bedroom
- house.bathroom

You must:
- Auto-generate room sizes based on available area.
- Fit all rooms inside the plot boundary.
- Draw internal walls as thick solid lines.
- Add doors (wall gaps + simple arc).
- Add windows (thin double-lines).

4. LABELS:
Each room MUST have centered text:
"ROOM NAME (estimated_width' x estimated_height')"

5. VIEWBOX:
Set:
viewBox="0 0 {plot.width*10 + 20} {plot.length*10 + 20}"

6. NORTH INDICATOR:
Place a clear North arrow in the top-right corner.

7. VALIDITY CHECK:
Your output MUST contain:
- <rect> OR <line> OR <path>
If not, regenerate until the SVG is fully drawn.

8. NEVER RETURN EMPTY SVG.
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