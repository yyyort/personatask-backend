import { Router } from "express";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
} from "../controller/routine.controller";

const router = Router()
  .get("/routines/:userId/:id", getRoutines)
  .get("/routines/:userId", getRoutines)
  .post("/routines/:userId", createRoutine)
  .put("/routines/:user/Id:id", updateRoutine)
  .delete("/routines/:userId/:id", updateRoutine);
 
export default router;