import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/tasks.controller";
import { schemaValidator } from "../middleware/schemaValidator";
import { CreateTaskSchema, UpdateTaskSchema } from "../model/tasks.model";

const router = Router();

router.get('/tasks/:userId/:id', getTasks);
router.get('/tasks/:userId', getTasks);
router.post('/tasks/:userId', schemaValidator(CreateTaskSchema), createTask);
router.put('/tasks/:userId/:id', schemaValidator(UpdateTaskSchema), updateTask);
router.delete('/tasks/:userId/:id', deleteTask);

export default router;