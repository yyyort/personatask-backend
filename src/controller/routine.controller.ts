import { Request, Response } from "express";
import {
  createRoutineService,
  deleteRoutineService,
  getAllRoutineService,
  getRoutineService,
  updateRoutineService,
} from "../service/routine.service";
import { CreateRoutineType, UpdateRoutineType } from "../model/routine.model";

/* get */
export const getRoutines = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    if (id) {
      //get routine
      const routine = await getRoutineService({ userId, id: id });
      res.json(routine);
    } else {
      //get all routines
      const routines = await getAllRoutineService(userId);
      res.json(routines);
    }
  } catch (error: unknown) {
    if ((error as Error).message === "Routine not found") {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

/* create */
export const createRoutine = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const data: CreateRoutineType = req.body;

  try {
    //create routine
    const routine = await createRoutineService(data, userId);
    res.status(201).json({ message: "Routine created successfully", routine });
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/* update */
export const updateRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;
  const data: UpdateRoutineType = req.body;

  try {
    //update routine
    const updatedRoutine = await updateRoutineService(data, userId, id);
    res
      .status(200)
      .json({ message: "Routine updated successfully", updatedRoutine });
  } catch (error: unknown) {
    if ((error as Error).message === "Routine not found") {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

/* delete */
export const deleteRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    //delete routine
    const deletedRoutine = await deleteRoutineService({
      userId,
      id: id,
    });
    res
      .status(200)
      .json({ message: "Routine deleted successfully", deletedRoutine });
  } catch (error: unknown) {
    if ((error as Error).message === "Routine not found") {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};
