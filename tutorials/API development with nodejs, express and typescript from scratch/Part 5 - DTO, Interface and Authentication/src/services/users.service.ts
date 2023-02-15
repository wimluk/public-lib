import { PrismaClient, User } from '@prisma/client';

class UsersService {
  public users = new PrismaClient().user;

  public getUsers = async (): Promise<User[]> => {
    try {
      return await this.users.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getUserById = async (id: string): Promise<User | null> => {
    try {
      return await this.users.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  public createUser = async (data: User): Promise<User> => {
    try {
      return await this.users.create({
        data,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  public updateUser = async (id: string, data: User): Promise<User> => {
    try {
      return await this.users.update({
        where: {
          id,
        },
        data,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  public deleteUser = async (id: string): Promise<User> => {
    try {
      return await this.users.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export default UsersService;
