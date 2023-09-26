import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from "./dto/find-user.dto";
import { LoginDto } from "./dto/login.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('user')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('user/find-user')
  findUser(@Body() findUser: FindUserDto){
    return this.userService.findUser(findUser)
  }

  @Patch('/change-password')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete('user:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.userService.login(loginDto)
  }

  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.userService.forgotPassword(forgotPasswordDto)
  }
}
