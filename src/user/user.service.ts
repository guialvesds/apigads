import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const data: Prisma.usersCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.prismaService.users.create({ data });

      return {
        ...createdUser,
      };
    } catch (error) {
      console.log('Erro ao criar usuáro: ', error);
    }
  }

  findByEmail(email: string) {
    return this.prismaService.users.findUnique({
      where: { email },
    });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
