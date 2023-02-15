import { Request, Response } from 'express';
import UsersService from '@/services/users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '@/dtos/users.dto';
import { validate } from 'class-validator';
import { CreateUserResponse } from '@/interfaces/users.interface';

class UsersController {
  public usersService = new UsersService();

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users: User[] = await this.usersService.getUsers();
      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User | null = await this.usersService.getUserById(id);
      res.status(200).json({ user });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto = new CreateUserDto();
      createUserDto.email = req.body.email;
      createUserDto.name = req.body.name;
      createUserDto.password = req.body.password;

      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        const constraints = {};
        errors.forEach(error => {
          const propertyName = error.property;
          const errorConstraints = Object.values(error.constraints);
          constraints[propertyName] = errorConstraints;
        });
        res.status(400).json({ constraints });
        return;
      }

      const user: User = req.body;
      const newUser: User = await this.usersService.createUser(user);
      const { email, name } = newUser;
      const createUserResponse: CreateUserResponse = { email, name };
      res.status(201).json({ user: createUserResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userUpdate: User = req.body;
      const updatedUser: User = await this.usersService.updateUser(id, userUpdate);
      res.status(200).json({ user: updatedUser });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUser: User = await this.usersService.deleteUser(id);
      res.status(200).json({ user: deletedUser });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}

export default UsersController;
