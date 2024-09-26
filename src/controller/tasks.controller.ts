import { Request, Response } from "express";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskService,
  updateTaskService,
} from "../service/tasks.service";
import {
  CreateTaskType,
  GetTaskType,
  UpdateTaskType,
} from "../model/tasks.model";

export const getTasks = async (req: Request, res: Response) => {
  const { userId, id } = req.params;

  try {
    if (id) {
      //get task
      const tasks: GetTaskType[] = await getTaskService({
        userId,
        id: Number(id),
      });
      res.json(tasks);
    } else {
      //get all tasks
      const tasks = await getAllTasksService(userId);
      res.json(tasks);
    }
  } catch (error: unknown) {
    if ((error as Error).message === "Task not found") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data: CreateTaskType = req.body;

  try {
    const task: GetTaskType = await createTaskService(data, userId);
    res.status(201).json(task);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//update task
export const updateTask = async (req: Request, res: Response) => {
  const { userId, id } = req.params;
  const data: UpdateTaskType = req.body;

  try {
    const updatedTask = await updateTaskService(data, Number(id), userId);

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error: unknown) {
    if ((error as Error).message === "Task not found") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

//update status
export const updateTaskStatus = async (req: Request, res: Response) => {
  const { userId, id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await updateTaskService(
      { status },
      Number(id),
      userId
    );

    res.status(200).json({ message: "Task status updated successfully", updatedTask });
  } catch (error: unknown) {
    if ((error as Error).message === "Task not found") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

//delete task
export const deleteTask = async (req: Request, res: Response) => {
  const { userId, id } = req.params;

  try {
    //delete task
    const deletedTask = await deleteTaskService({ userId, id: Number(id) });

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error: unknown) {
    if ((error as Error).message === "Task not found") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};
