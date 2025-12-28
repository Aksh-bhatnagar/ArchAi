import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty 
    // check if your already exist: username,email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const {firstname, lastname, password, email} = req.body

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

const loginUser = asyncHandler( async(req, res) => {
    // req body -> data
    // email
    // find the user
    // password check
    // access and refresh token
    // send cookie
    
    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out Successfully")
    )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const user = await User.findByIdAndUpdate(req.user?._id)
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if (isPasswordValid == false) {
        throw new ApiError(400, "Invalid Password")
    }

    if (oldPassword == newPassword) {
        throw new ApiError(401, "new Password must be different")
    }
    
    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched Successfully"))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {firstname, lastname} = req.body
    
    if (!firstname) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                firstname: firstname,
                lastname: lastname
            }
        },
        {new: true}
    ).select("-password")

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

export { registerUser, loginUser, logoutUser, changeCurrentPassword, getCurrentUser, updateAccountDetails }