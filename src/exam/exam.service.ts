import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { CreateExamDto } from "./dto/create-exam.dto";
import { UpdateExamDto } from "./dto/update-exam.dto";
import {Response} from "express";

class UploadedFile {
}

@Injectable()
export class ExamService {
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

  findAll() {
    return `This action returns all exam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }

  async upload(file: Express.Multer.File){
    if(!file) {
      throw new BadRequestException('file not type pdf')
    }else {
      return {
        fileName: `http://localhost:3000/exam/pdf/${file.filename}`
      }
    }
  }
  async getExamPdf(fileName: any, res: Response){
    return res.sendFile(fileName,{root:'./uploads'})
  }
}
