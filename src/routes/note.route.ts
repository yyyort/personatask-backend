import { Router } from "express";
import { createNote, deleteNote, getNotes, updateFavorite, updateNote, updatePinned } from "../controller/note.controller";
import { schemaValidator } from "../middleware/schemaValidator";
import { CreateNoteSchema, UpdateNoteSchema } from "../model/notes.model";
import { authValidator } from "../middleware/authHandler";
const router = Router();

//use auth middleware
router.use(authValidator);

router.get('/notes/:id', getNotes);
router.get('/notes', getNotes);
router.post('/notes', schemaValidator(CreateNoteSchema), createNote);
router.put('/notes/:id', schemaValidator(UpdateNoteSchema) ,  updateNote);
router.patch('/notes/:id/favorite',  updateFavorite);
router.patch('/notes/:id/pinned', updatePinned);
router.delete('/notes/:id', deleteNote);

export default router;