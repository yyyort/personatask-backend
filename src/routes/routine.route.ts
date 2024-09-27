import { Router } from "express";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
} from "../controller/routine.controller";
import { authValidator } from "../middleware/authHandler";



const router = Router()
  .get("/routines/:id", getRoutines)
  .get("/routines/", getRoutines)
  .post("/routines/", createRoutine)
  .put("/routines/:id", updateRoutine)
  .delete("/routines/:id", updateRoutine);

  //use auth middleware
router.use(authValidator);
 
export default router;