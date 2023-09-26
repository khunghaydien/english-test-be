import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '09022000',
    database: 'english',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), UserModule, ExamModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor (private dataSource: DataSource){}
}
