import { Request, Response } from 'express';
import UsersService from '@/services/users.service';
import { User } from '@prisma/client';

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

  public getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params;
      const user: User | null = await this.usersService.getUserByEmail(email);
      res.status(200).json({ user });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = req.body;
      const newUser: User = await this.usersService.createUser(user);
      res.status(201).json({ user: newUser });
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
