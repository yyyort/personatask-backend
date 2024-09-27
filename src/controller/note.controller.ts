import { Request, Response } from "express";
import {
  createNoteService,
  deleteNoteService,
  getAllNotesService,
  getNoteService,
  UpdateFavoriteNoteService,
  updateNoteService,
} from "../service/note.service";
import { CreateNoteType, UpdateNoteType } from "../model/notes.model";

//get notes
export const getNotes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    if (id) {
      //get note
      const notes = await getNoteService(Number(id), userId);
      res.json(notes);
    } else {
      //get all notes
      const notes = await getAllNotesService(userId);
      res.json(notes);
    }
  } catch (error: unknown) {
    if ((error as Error).message === "Note not found") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

//create note
export const createNote = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const data: CreateNoteType = req.body;

  try {
    //create note
    const note = await createNoteService(data, userId);

    res.status(201).json(note);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//update note
export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateNoteType = req.body;
  const userId = req.body.userId;

  try {
    //update note
    const updatedNote = await updateNoteService(Number(id), data, userId);

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error: unknown) {
    if ((error as Error).message === "Note not found") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

//update patch favorite
export const updateFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: boolean = req.body;
  const userId = req.body.userId;

  try {
    //update note
    const updatedNote = await UpdateFavoriteNoteService(
      Number(id),
      userId,
      data
    );

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error: unknown) {
    if ((error as Error).message === "Note not found") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

//update patch pinned
export const updatePinned = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;
  const pinned: boolean = req.body;

  try {
    //update note
    const updatedNote = await UpdateFavoriteNoteService(
      Number(id),
      userId,
      pinned
    );

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error: unknown) {
    if ((error as Error).message === "Note not found") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};

//delete note
export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    //delete note
    const deletedNote = await deleteNoteService(Number(id), userId);
    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error: unknown) {
    if ((error as Error).message === "Note not found") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: (error as Error).message });
  }
};
