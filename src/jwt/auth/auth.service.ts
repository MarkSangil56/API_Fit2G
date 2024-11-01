import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/user/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async register(email: string, password: string, first_name: string, last_name: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueId = uuidv4(); 
    const createdTime = new Date();

    return this.userService.create({
      id: uniqueId, 
      uid: uniqueId,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      createdTime,
    });
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }
}
