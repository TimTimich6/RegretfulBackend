import { Router } from "express";
import * as controller from "../controllers/usercontroller";
const router = Router();

router.get("/:id", controller.getAccount);
router.post("/", controller.createUser);
router.put("/block/:id", controller.blockAccount);
router.put("/filter", controller.setFilter);

export default router;
