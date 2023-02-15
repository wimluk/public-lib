import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { HttpException } from '@exceptions/HttpException';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
  public users = new PrismaClient().user;

  public async signup(data: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({ where: { email: data.email } });
    if (findUser) throw new HttpException(409, `This email ${data.email} already exists`);

    const hashedPassword = await hash(data.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...data, password: hashedPassword } });

    return createUserData;
  }

  public async login(data: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({ where: { email: data.email } });
    if (!findUser) throw new HttpException(409, `This email ${data.email} was not found`);

    const isPasswordMatching: boolean = await compare(data.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(data: User): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { email: data.email, password: data.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
