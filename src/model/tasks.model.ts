import { z } from "zod";

export const TaskModelSchema = z.object({
    id: z.number(),
    userId: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    status: z.enum(["due", "done", "overdue"]),
    timeTodo: z.date().nullable().optional(),
    deadline: z.date().nullable().optional(),
    routineId: z.number().nullable().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateTaskSchema = TaskModelSchema.pick({ name: true, description: true, status: true, timeTodo: true, deadline: true });
export const GetTaskSchema = TaskModelSchema.omit({ createdAt: true, updatedAt: true });
export const UpdateTaskSchema = z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    status: z.enum(["due", "done", "overdue"]).optional(),
    timeTodo: z.date().nullable().optional(),
    deadline: z.date().nullable().optional(),
});

export type TaskModelType = z.infer<typeof TaskModelSchema>;
export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
export type GetTaskType = z.infer<typeof GetTaskSchema>;
export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>;
