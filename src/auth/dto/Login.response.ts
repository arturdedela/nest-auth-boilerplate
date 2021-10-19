import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponse {
  @ApiProperty()
  @IsString()
  readonly token: string;
}
