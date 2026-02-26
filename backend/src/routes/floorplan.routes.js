import { Router } from "express";
import { deleteFloorplan, downloadSvg, generator, getFloorplanById, getMyFloorplans, renameFloorplan } from "../controllers/floorplan.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, generator)
router.route("/my-floorplans").get(verifyJWT, getMyFloorplans)
router.route("/:id").get(getFloorplanById);
router.route("/:id/rename").patch(verifyJWT, renameFloorplan);
router.route("/:id/delete").delete(verifyJWT, deleteFloorplan);
router.route("/:id/download").get(verifyJWT, downloadSvg);


export default router;