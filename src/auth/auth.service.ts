import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
