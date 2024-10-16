import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { CreateTaskType, GetTaskType, UpdateTaskType } from "../model/tasks.model";
import { taskTable } from "../schema";

//create task
export async function createTaskService(data: CreateTaskType, userId: string) {
    try {
        //create task
        const task: GetTaskType[] = await db.insert(taskTable).values({
            userId: userId,
            routineId: data.routineId,
            name: data.name,
            description: data.description,
            status: data.status,
            timeTodo: data.timeTodo,
            deadline: data.deadline
        }).returning({
            id: taskTable.id,
            userId: taskTable.userId,
            name: taskTable.name,
            description: taskTable.description,
            status: taskTable.status,
            timeTodo: taskTable.timeTodo,
            deadline: taskTable.deadline,
        });

        return task[0];
    } catch (error: unknown) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    }
};

//get tasks
export async function getTaskService(data: { userId: string, id: number }) {
    try {
        //get tasks
        const tasks: GetTaskType[] = await db.select(
            {
                id: taskTable.id,
                userId: taskTable.userId,
                name: taskTable.name,
                description: taskTable.description,
                status: taskTable.status,
                timeTodo: taskTable.timeTodo,
                deadline: taskTable.deadline,
            }
        ).from(taskTable).where(
            and(
                eq(taskTable.userId, data.userId),
                eq(taskTable.id, data.id),
            )
        );

        return tasks;
    } catch (error: unknown) {
        throw new Error((error as Error).message);
    }
};

//get all tasks
export async function getAllTasksService(userId: string) {
    try {
        //get tasks
        const tasks: GetTaskType[] = await db.select(
            {
                id: taskTable.id,
                userId: taskTable.userId,
                name: taskTable.name,
                description: taskTable.description,
                status: taskTable.status,
                timeTodo: taskTable.timeTodo,
                deadline: taskTable.deadline,
            }
        ).from(taskTable).where(
            eq(taskTable.userId, userId)
        );

        return tasks;
    } catch (error: unknown) {
        throw new Error((error as Error).message);
    }
};

//update task
export async function updateTaskService(data: UpdateTaskType, id: number, userId: string) {
    try {
        //update task
        const task: GetTaskType[] = await db.update(taskTable).set(data).where(
            and(
                eq(taskTable.userId, userId),
                eq(taskTable.id, id),
            )
        ).returning(
            {
                id: taskTable.id,
                userId: taskTable.userId,
                name: taskTable.name,
                description: taskTable.description,
                status: taskTable.status,
                timeTodo: taskTable.timeTodo,
                deadline: taskTable.deadline,
            }
        );

        //if there is no task
        if (task.length <= 0) {
            throw new Error('Task not found');
        }

        return task[0];
    } catch (error: unknown) {
        throw new Error((error as Error).message);
    }
};

//delete task
export async function deleteTaskService(data: { userId: string, id: number }) {
    try {
        //delete task
        const task: GetTaskType[] = await db.delete(taskTable).where(
            and(
                eq(taskTable.userId, data.userId),
                eq(taskTable.id, data.id),
            )
        ).returning({
            id: taskTable.id,
            userId: taskTable.userId,
            name: taskTable.name,
            description: taskTable.description,
            status: taskTable.status,
            timeTodo: taskTable.timeTodo,
            deadline: taskTable.deadline,
        });

        if (task.length === 0) {
            throw new Error('Task not found');
        }

        return task[0];
    } catch (error: unknown) {
        throw new Error((error as Error).message);
    }
};