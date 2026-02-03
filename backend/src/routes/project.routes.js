import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getProjectById } from "../controllers/project.controller.js";

const router = Router();

router.route("/projects/:id").get(verifyJWT, getProjectById);

export default router;
