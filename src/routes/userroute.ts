import { Router } from "express";
import * as controller from "../controllers/usercontroller";
const router = Router();

router.get("/:id", controller.getAccount);
router.post("/", controller.createUser);

export default router;
