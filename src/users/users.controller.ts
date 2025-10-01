import { Controller, Post, Body, UseGuards, Request, Get, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findMe(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiBody({ type: UpdateUserDto })
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateMe(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  deleteProfile(@Request() req) {
    return this.usersService.deleteMe(req.user.userId);
  }
}
