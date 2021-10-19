import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static hashPassword(password: string) {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  @BeforeInsert()
  protected beforeInsert() {
    this.password = User.hashPassword(this.password);
  }

  isPasswordValid(password: string): boolean {
    return this.password === User.hashPassword(password);
  }
}
