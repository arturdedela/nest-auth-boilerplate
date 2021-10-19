import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types';
import { Request } from 'express';
import { RegisterRequest } from './dto/Register.request';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.isPasswordValid(password)) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  signToken(user: Request['user']) {
    const payload: JWTPayload = { id: user.id };
    return this.jwtService.sign(payload);
  }

  async registerUser({ email, password }: RegisterRequest) {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) {
      throw new ConflictException('User already exist');
    }

    await this.usersService.create(email, password);
  }
}
