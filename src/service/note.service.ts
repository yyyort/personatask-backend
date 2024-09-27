import { and, eq } from "drizzle-orm";
import { db } from "../db";
import {
  CreateNoteType,
  NoteModelType,
  UpdateNoteType,
} from "../model/notes.model";
import { noteTable } from "../schema";

/* create */
export async function createNoteService(data: CreateNoteType, userId: string) {
  try {
    const note: NoteModelType[] = await db
      .insert(noteTable)
      .values({
        userId: userId,
        title: data.title,
        content: data.content,
      })
      .returning();

    return note[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* read */
export async function getNoteService(noteId: number, userId: string) {
  try {
    const note: NoteModelType[] = await db
      .select()
      .from(noteTable)
      .where(and(eq(noteTable.userId, userId), eq(noteTable.id, noteId)));

    if (note.length <= 0) {
      throw new Error("Note not found");
    }

    return note[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

export async function getAllNotesService(userId: string) {
  try {
    const notes: NoteModelType[] = await db
      .select()
      .from(noteTable)
      .where(eq(noteTable.userId, userId));

    return notes;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* update */
export async function updateNoteService(
  noteId: number,
  data: UpdateNoteType,
  userId: string
) {
  try {
    const note: NoteModelType[] = await db
      .update(noteTable)
      .set({
        title: data.title,
        content: data.content,
      })
      .where(and(eq(noteTable.userId, userId), eq(noteTable.id, noteId)))
      .returning();

    if (note.length <= 0) {
      throw new Error("Note not found");
    }

    return note[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

export const UpdateFavoriteNoteService = async (
  noteId: number,
  userId: string,
  isFavorite: boolean
) => {
  try {
    const note: NoteModelType[] = await db
      .update(noteTable)
      .set({
        favorite: isFavorite,
      })
      .where(and(eq(noteTable.userId, userId), eq(noteTable.id, noteId)))
      .returning();

    if (note.length <= 0) {
      throw new Error("Note not found");
    }

    return note[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

export const UpdatePinnedNoteService = async (
  noteId: number,
  userId: string,
  isPinned: boolean
) => {
  try {
    const note: NoteModelType[] = await db
      .update(noteTable)
      .set({
        pinned: isPinned,
      })
      .where(and(eq(noteTable.userId, userId), eq(noteTable.id, noteId)))
      .returning();

    if (note.length <= 0) {
      throw new Error("Note not found");
    }

    return note[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* delete */
export async function deleteNoteService(noteId: number, userId: string) {
  try {
    const note: NoteModelType[] = await db
      .delete(noteTable)
      .where(and(eq(noteTable.userId, userId), eq(noteTable.id, noteId)))
      .returning();

    if (note.length <= 0) {
      throw new Error("Note not found");
    }

    return note[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}
