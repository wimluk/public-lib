import { Router } from 'express';
import UsersController from '@controllers/users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/users', usersController.getUsers);

usersRouter.get('/users/:id', usersController.getUserById);

export default usersRouter;
