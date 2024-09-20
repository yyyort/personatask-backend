import { Request, Response } from "express";
import { createTaskService, deleteTaskService, getAllTasksService, getTaskService, updateTaskService } from "../service/tasks.service";
import { CreateTaskType, GetTaskType, TaskModelType, UpdateTaskType } from "../model/tasks.model";

export const getTasks = async (req: Request, res: Response) => {
    const { userId, id } = req.params;

    try {
        if (id) {
            //get task
            const tasks: GetTaskType[] = await getTaskService({ userId, id: Number(id) });
            res.json(tasks);
        } else {
            //get all tasks
            const tasks = await getAllTasksService(userId);
            res.json(tasks);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const createTask = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const data: CreateTaskType = req.body;

    try {
        const task: GetTaskType = await createTaskService(data, userId);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

//update task
export const updateTask = async (req: Request, res: Response) => {
    const { userId, id } = req.params;
    const data: UpdateTaskType = req.body;

    try {
        const updatedTask = await updateTaskService(data, Number(id), userId);

        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

//delete task
export const deleteTask =  async (req: Request, res: Response) => {
    const { userId, id } = req.params;

    try {
        //delete task
        const deletedTask = await deleteTaskService({ userId, id: Number(id) });
        
        res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}