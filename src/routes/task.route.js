import { Router } from "express";
import { taskController } from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = new Router();

router.post("/tasks", auth, taskController.create);

router.get("/tasks", auth, taskController.get);

router.get("/tasks/:id", auth, taskController.getById);

router.patch("/tasks/:id", auth, taskController.updateById);

router.delete('/tasks/:id', auth, taskController.deleteById)

export default router;
