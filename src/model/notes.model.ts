import { z } from "zod";

export const NoteModelSchema = z.object({
    id: z.number(),
    userId: z.string(),
    title: z.string(),
    content: z.string().nullable().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const CreateNoteSchema = NoteModelSchema.pick({ title: true, content: true });
export const UpdateNoteSchema = z.object({
    title: z.string().optional(),
    content: z.string().nullable().optional(),
});


export type NoteModelType = z.infer<typeof NoteModelSchema>;
export type CreateNoteType = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteType = z.infer<typeof UpdateNoteSchema>;