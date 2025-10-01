import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async updateMe(userId: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async deleteMe(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
