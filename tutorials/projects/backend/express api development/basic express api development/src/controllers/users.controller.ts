import { Request, Response } from 'express';
import users from '@/utils/data';

class UsersController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      res.status(200).json(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const user = users.find(u => u.id === parseInt(req.params.id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

export default UsersController;
