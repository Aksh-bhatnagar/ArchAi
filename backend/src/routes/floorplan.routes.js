import { Router } from "express";
import { generator } from "../controllers/floorplan.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/floorplan").post(verifyJWT, generator)

export default router