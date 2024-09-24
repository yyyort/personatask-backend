import { z } from "zod";
import { NoteModelSchema } from "./notes.model";
import { TaskModelSchema } from "./tasks.model";

export const RoutineModelSchema = z.object({
    id: z.number(),
    userId: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    tasks: z.array(TaskModelSchema).optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateRoutineSchema = RoutineModelSchema.pick({ title: true, description: true, tasks: true });
export const UpdateRoutineSchema = z.object({
    title: z.string().optional(),
    description: z.string().nullable().optional(),
});
export const GetRoutineSchema = RoutineModelSchema.omit({ createdAt: true, updatedAt: true });

export type RoutineModelType = z.infer<typeof RoutineModelSchema>;
export type CreateRoutineType = z.infer<typeof CreateRoutineSchema>;
export type UpdateRoutineType = z.infer<typeof UpdateRoutineSchema>;
export type GetRoutineType = z.infer<typeof GetRoutineSchema>;