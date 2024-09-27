import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask, updateTaskStatus } from "../controller/tasks.controller";
import { schemaValidator } from "../middleware/schemaValidator";
import { CreateTaskSchema, UpdateTaskSchema } from "../model/tasks.model";
import { authValidator } from "../middleware/authHandler";

const router = Router();

//use auth middleware
router.use(authValidator);

router.get('/tasks/:id', getTasks);
router.get('/tasks', getTasks);
router.post('/tasks', schemaValidator(CreateTaskSchema), createTask);
router.put('/tasks/:id', schemaValidator(UpdateTaskSchema), updateTask);
router.patch('/tasks/:id', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);



export default router;