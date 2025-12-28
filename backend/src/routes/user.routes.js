import { Router } from "express";
import { registerUser, loginUser, logoutUser, changeCurrentPassword, updateAccountDetails, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getUser").get(verifyJWT, getCurrentUser)
router.route("/changePassword").post(verifyJWT, changeCurrentPassword)
router.route("/updateAccount").post(verifyJWT, updateAccountDetails)

export default router