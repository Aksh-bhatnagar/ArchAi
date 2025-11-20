// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { Floorplan } from "../models/floorplan.model.js"
// import GenAI from "../connections/Ai/gemini.js";

// const generator = asyncHandler(async (req, res) => {

//     //get data from frontend
//     //validate data
//     //store to mongoose
//     //send json data to ai
//     //retreave svg data from ai
//     //display or send to frontend
//     //clear mongoose
//     const propertyData = req.body;

//     if (!propertyData) {
//         throw new ApiError(400, "Please fill property data")
//     }

//     console.log(propertyData)
//     // const floorplan = await Floorplan.create(propertyData)

//     // const createdProperty = await Floorplan.findById(floorplan._id);

//     // if (!createdProperty) {
//     //     throw new ApiError(500, "something went wrong while Creating Property Details")
//     // }

//     // console.log(createdProperty)

//     const prompt = `You are an architectural floorplan generator. 
// Using ONLY the JSON data below, generate a COMPLETE, VALID SVG floorplan.

// JSON Input:
// ${propertyData}

// ========================
// MANDATORY SVG RULES
// ========================

// 1. OUTPUT FORMAT:
// - Output ONLY raw SVG.
// - Must start with <svg ...> and end with </svg>.
// - NO markdown, NO code blocks, NO explanations, NO text outside SVG.

// 2. PLOT:
// - Use plot.width and plot.length from JSON.
// - Scale: 1 foot = 10 pixels.
// - Convert plot.width → width_px and plot.length → height_px.

// 3. ROOMS (AUTO-CALCULATE):
// Based on JSON:
// - house.living
// - house.kitchen
// - house.bedroom
// - house.bathroom

// You must:
// - Auto-generate room sizes based on available area.
// - Fit all rooms inside the plot boundary.
// - Draw internal walls as thick solid lines.
// - Add doors (wall gaps + simple arc).
// - Add windows (thin double-lines).

// 4. LABELS:
// Each room MUST have centered text:
// "ROOM NAME (estimated_width' x estimated_height')"

// 5. VIEWBOX:
// Set:
// viewBox="0 0 {plot.width*10 + 20} {plot.length*10 + 20}"

// 6. VALIDITY CHECK:
// Your output MUST contain:
// - <rect> OR <line> OR <path>
// If not, regenerate until the SVG is fully drawn.

// 7. NEVER RETURN EMPTY SVG.
//  `


//     const response = await GenAI(prompt);

//     if (!response || !response.text) {
//         throw new ApiError(500, "Ai Failed to generate SVG")
//     }

//     // let svgContent = response.text.trim();

//     // svgContent = svgContent.replace(/^```(?:svg|xml|html)?\n?/i, '');
//     // svgContent = svgContent.replace(/\n?```$/, '');
//     // svgContent = svgContent.trim();

//     // if (!svgContent.includes('<svg')) {
//     //     throw new ApiError(500, "AI response does not contain valid SVG")
//     // }
    
//     // console.log("SVG Generated Successfully - Length:", svgContent.length)
//     console.log(response.text)


//     return res.status(201).json(
//         new ApiResponse(200, { svg: response.text },"floorplan generated successfully")
//     )
// })

// export { generator } 

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
    const propertyData = req.body;

    if (!propertyData) {
        throw new ApiError(400, "Please fill property data")
    }

    console.log(propertyData)
    // const floorplan = await Floorplan.create(propertyData)

    // const createdProperty = await Floorplan.findById(floorplan._id);

    // if (!createdProperty) {
    //     throw new ApiError(500, "something went wrong while Creating Property Details")
    // }

    // console.log(createdProperty)

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

    if (!response) {
        throw new ApiError(500, "Ai Failed to generate SVG")
    }

    console.log(response.text)

    return res.status(201).json(
        new ApiResponse(200, response.text,"floorplan generated successfully")
    )
})

export { generator } 