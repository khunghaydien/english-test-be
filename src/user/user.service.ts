import { Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserDto } from "./dto/find-user.dto";
import { LoginDto } from "./dto/login.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {password , email } = createUserDto
    const newUser  = this.usersRepository.create({password, email});
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async getUserById(id: string) {
    const options : FindOneOptions<User>= {
      where: {id}
    }
   return this.usersRepository.findOne(options)
  }

  async  findUser(findUser: FindUserDto): Promise<User[]>{
    const { email} = findUser
    const options: FindManyOptions<User> = {
      where: { email }
    }
    return  this.usersRepository.find(options)
  }

 async update(updateUserDto: UpdateUserDto) {
    const {email, password} = updateUserDto;
    try {
      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: password })
        .where('email = :email', { email: email })
        .execute();
    }catch (err){
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto){
    const {email } = forgotPasswordDto
    const options : FindOneOptions<User> = {
      where: { email }
    }
    const user =  this.usersRepository.find(options)
    const _ = require('lodash');
    const randomNum = _.random(100000, 999999);
    if (user){
      const updateUserDto  = {
        email: email,
        password: randomNum
      }
      await this.update(updateUserDto);
      return `mã đăng nhập mới của bạn: ${randomNum}`
    }else {
      return 'email không tồn tại mời bạn đăng ký'
    }
  }

  async login(loginDto: LoginDto){
    const {email, password} = loginDto;
    const options : FindOneOptions<User> = {
      where: { email, password }
    }
    const user = await this.usersRepository.findOne(options)
    if(!user){
      throw new UnauthorizedException(`Email hoặc mật khâu không đúng`);
    }
    const jwt = require('jsonwebtoken');
    const payload = { id: user.id, email: user.email };
    const accessToken: string = jwt.sign(payload, 'dat-hien', {expiresIn: '1h'});
    return {data: accessToken}
  }
}
