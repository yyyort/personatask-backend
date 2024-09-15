import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { CreateTaskType, GetTaskType, TaskModelType, UpdateTaskType } from "../model/tasks.model";
import { taskTable } from "../schema";
import { create } from "domain";
import e from "express";

//create task
export async function createTaskService(data: CreateTaskType, userId: string) {
    try {
        //create task
        const task: TaskModelType[] = await db.insert(taskTable).values({
            userId: userId,
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
            createdAt: taskTable.createdAt,
            updatedAt: taskTable.updatedAt
        });

        return task[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
};

//get tasks
export async function getTaskService(data: GetTaskType) {
    try {
        //get tasks
        const tasks: TaskModelType[] = await db.select().from(taskTable).where(
            and(
                eq(taskTable.userId, data.userId),
                eq(taskTable.id, data.id),
            )
        );

        //if there is no task
        if (tasks.length <= 0) {
            throw new Error('Task not found');
        }

        return tasks;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

//get all tasks
export async function getAllTasksService(userId: string ) {
    try {
        //get tasks
        const tasks: TaskModelType[] = await db.select().from(taskTable).where(
            eq(taskTable.userId, userId)
        );

        //if there is no task
        if (tasks.length <= 0) {
            throw new Error('Task not found');
        }
        
        return tasks;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

//update task
export async function updateTaskService(data: UpdateTaskType, id: number, userId: string) {
    try {
        //update task
        const task: TaskModelType[] = await db.update(taskTable).set(data).where(
            and(
                eq(taskTable.userId, userId),
                eq(taskTable.id, id),
            )
        ).returning();

        //if there is no task
        if (task.length <= 0) {
            throw new Error('Task not found');
        }

        return task[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
};

//delete task
export async function deleteTaskService(data: GetTaskType) {
    try {
        //delete task
        const task: TaskModelType[] = await db.delete(taskTable).where(
            and(
                eq(taskTable.userId, data.userId),
                eq(taskTable.id, data.id),
            )
        ).returning();

        if (task.length === 0) {
            throw new Error('Task not found');
        }

        return task[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
};