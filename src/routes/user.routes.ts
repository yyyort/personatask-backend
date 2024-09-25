import { Router } from 'express';
import { getUser, refreshToken, signIn, signOut, signUp, updateUser } from '../controller/users.controller';
import { schemaValidator } from '../middleware/schemaValidator';
import { CreateUserSchema, UpdateUserSchema } from '../model/users.model';

const router = Router();

router.post('/user/signup', schemaValidator(CreateUserSchema), signUp);
router.post('/user/signin', schemaValidator(CreateUserSchema), signIn);
router.post('/user/signout', signOut);
router.put('/user', schemaValidator(UpdateUserSchema), updateUser);
router.get('/user/:id', getUser); 
router.post('/user/refreshtoken', refreshToken);

export default router;