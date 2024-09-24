import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/note.controller";
import { schemaValidator } from "../middleware/schemaValidator";
import { CreateNoteSchema, UpdateNoteSchema } from "../model/notes.model";
const router = Router();

router.get('/notes/:userId/:id', getNotes);
router.get('/notes/:userId', getNotes);
router.post('/notes/:userId', schemaValidator(CreateNoteSchema), createNote);
router.put('/notes/:userId/:id', schemaValidator(UpdateNoteSchema) ,  updateNote);
router.delete('/notes/:userId/:id', deleteNote);

export default router;