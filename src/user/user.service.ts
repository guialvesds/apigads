import { File } from './../file/entities/file.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
      include: { avatar: true },
    });
  }

  findAll() {
    return this.prismaService.users.findMany({
      include: { avatar: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.users.findUnique({
      where: { id: id },
      include: { avatar: true },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.prismaService.users.update({
  //     where: { id: id },
  //     data: updateUserDto,
  //   });
  // }

  remove(id: number) {
    return this.prismaService.users.delete({
      where: { id },
    });
  }
}
