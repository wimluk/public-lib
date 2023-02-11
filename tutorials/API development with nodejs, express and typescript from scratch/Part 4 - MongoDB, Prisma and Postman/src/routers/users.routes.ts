import { Router } from 'express';
import UsersController from '@controllers/users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/users', usersController.getUsers);

usersRouter.get('/users/:id', usersController.getUserById);

usersRouter.get('/users/email/:email', usersController.getUserByEmail);

usersRouter.post('/users', usersController.createUser);

usersRouter.put('/users/:id', usersController.updateUser);

usersRouter.delete('/users/:id', usersController.deleteUser);

export default usersRouter;
