import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
@Module({
  imports: [TaskModule,
    MongooseModule.forRoot('mongodb://localhost:27017/task'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
