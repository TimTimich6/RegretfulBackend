import { Router } from "express";
import * as controller from "../controllers/postcontroller";
const router = Router();

router.put("/like/:id", controller.likePost);
router.delete("/like/:id", controller.unlikePost);
router.get("/filtered", controller.getFiltered);
router.get("/:id", controller.getPost);

router.get("/", controller.getAll);
router.post("/", controller.createPost);

export default router;
