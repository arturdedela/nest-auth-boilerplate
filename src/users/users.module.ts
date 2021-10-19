import { Module } from '@nestjs/common';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
