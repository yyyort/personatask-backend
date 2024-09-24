import { Request, Response } from 'express';
import { createNoteService, deleteNoteService, getAllNotesService, getNoteService, updateNoteService } from '../service/note.service';

//get notes
export const getNotes = async (req: Request, res: Response) => {
    const { userId, id } = req.params;

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
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}


//create note
export const createNote = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const data = req.body;

    try {
        //create note
        const note = await createNoteService(data, userId);

        res.status(201).json({ message: 'Note created successfully', note });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}


//update note
export const updateNote = async (req: Request, res: Response) => {
    const { userId, id } = req.params;
    const data = req.body;

    try {
        //update note
        const updatedNote = await updateNoteService(Number(id), data, userId);

        res.status(200).json({ message: 'Note updated successfully', updatedNote });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}


//delete note
export const deleteNote = async (req: Request, res: Response) => {
    const { userId, id } = req.params;

    try {
        //delete note
        const deletedNote = await deleteNoteService(Number(id), userId);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}