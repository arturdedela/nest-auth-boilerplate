import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginRequest } from './dto/Login.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RegisterRequest } from './dto/Register.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequest, @Req() req: Request, @Res() res: Response) {
    const token = this.authService.signToken(req.user);
    res.cookie('token', token, { httpOnly: true });
    res.send({token})
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: RegisterRequest) {
    await this.authService.registerUser(body)
  }
}
