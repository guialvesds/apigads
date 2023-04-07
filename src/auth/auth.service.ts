import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      name: user.primary_name,
      email: user.email + ' ' + user.second_name,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      access_token: jwt,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      //Verificamos se a hash fornecida pelo front está de acordo com a do usuário.

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    // Caso não seja encontrado o e-mail informado ou a senha esteja errada.
    throw new Error('E-mail ou senha inválido.');
  }
}
