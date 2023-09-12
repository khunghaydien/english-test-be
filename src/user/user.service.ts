import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserDto } from "./dto/find-user.dto";

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {firstName , lastName , email }= createUserDto
    const newUser  = this.usersRepository.create({firstName, lastName, email});
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
    const {firstName, lastName, email} = findUser
    const options: FindManyOptions<User> = {
      where: { firstName }
    }
    return  this.usersRepository.find(options)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
