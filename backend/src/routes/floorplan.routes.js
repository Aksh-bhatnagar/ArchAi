import { Router } from "express";
import { generator } from "../controllers/floorplan.controller.js";

const router = Router()

router.route("/floorplan").post(generator)

export default router