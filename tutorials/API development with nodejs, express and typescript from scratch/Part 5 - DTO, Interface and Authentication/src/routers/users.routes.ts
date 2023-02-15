import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import authMiddleware from '@middlewares/auth.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/users', authMiddleware, usersController.getUsers);

usersRouter.get('/users/:id', authMiddleware, usersController.getUserById);

//usersRouter.post('/users', usersController.createUser);

usersRouter.put('/users/:id', authMiddleware, usersController.updateUser);

usersRouter.delete('/users/:id', authMiddleware, usersController.deleteUser);

export default usersRouter;
