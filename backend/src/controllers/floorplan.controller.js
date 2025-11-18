import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Floorplan } from "../models/floorplan.model.js"
import GenAI from "../connections/Ai/gemini.js";

const generator = asyncHandler( async (req, res) => {
    
    //get data from frontend
    //validate data
    //store to mongoose
    //send json data to ai
    //retreave svg data from ai
    //display or send to frontend
    //clear mongoose
    const propertyData = req.body;

    if(!propertyData) {
        throw new ApiError(400, "Please fill property data")
    }

    console.log(propertyData)
    // const floorplan = await Floorplan.create(propertyData)

    // const createdProperty = await Floorplan.findById(floorplan._id);

    // if (!createdProperty) {
    //     throw new ApiError(500, "something went wrong while Creating Property Details")
    // }

    // console.log(createdProperty)

    const prompt = 'how many color of apple were there'

    const response = await GenAI(prompt);

    if (!response) {
        throw new ApiError(500, "Ai Failed to generate SVG")
    }

    console.log(response.text)

})

export { generator }