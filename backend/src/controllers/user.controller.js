import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty 
    // check if your already exist: username,email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const {firstname, lastname, password, email} = req.body
    console.log("email: ", email)

    if (
        [firstname, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "Email already exist")
    }

    const user = await User.create({
        firstname,
        lastname,
        email,  
        password,
    })

    const createdUser = await User.findById(user._id).select("-password");
    
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
} )

const login = asyncHandler( async(req, res) => {
    const {email, password} = req.body
    
})

export { registerUser }