import express from 'express';
import { ContactUsController } from '../controllers/ContactUsController.js';
import { DeleteUser, getAllUsers, getIndividualUser, SignInController, SignupController, UpdateUser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/api/sign-up', SignupController);

router.post('/api/sign-in', SignInController)

router.post('/api/contact-us', ContactUsController)

router.get('/api/all-user', getAllUsers)

router.get('/api/user/:id', getIndividualUser)

router.patch('/api/user/:id', UpdateUser)

router.delete('/api/user/:id', DeleteUser)

export default router;