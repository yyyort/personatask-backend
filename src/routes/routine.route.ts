import { Router } from "express";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
} from "../controller/routine.controller";

const router = Router()
  .get("/routines", getRoutines)
  .get("/routines/:id", getRoutines)
  .post("/routines", createRoutine)
  .put("/routines/:id", updateRoutine)
  .delete("/routines/:id", updateRoutine);
 
export default router;