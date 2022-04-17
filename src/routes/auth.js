import { Router } from 'express';
import { loginUser, registerUser, getCurrentUser } from '../controllers/auth';
import { authenticateUser } from '../middlewares/auth';

const authRouter = Router();

authRouter.get('/user', authenticateUser, getCurrentUser);
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);

export default authRouter;
