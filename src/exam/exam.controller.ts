import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile, Res
} from "@nestjs/common";
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Response } from 'express';
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(+id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage:diskStorage({
      destination:'uploads',
      filename(rep, file,callback) {
        const name = file.originalname.split('.')[0];
        const fileExtension  = file.originalname.split('.')[1];
        const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
        callback(null,newFileName);
      }
    }),
    fileFilter: function(req, file, callback) {
      if (!file.originalname.match(/\.(pdf|png|jpg)$/)) {
        return callback(null,false)
      }
      callback(null, true)
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.examService.upload(file)
  }

  @Get('/pdf/:fileName')
  async GetExamPdf(@Param('fileName') fileName: any, @Res() res: Response){
    return this.examService.getExamPdf(fileName,res)
  }
}
