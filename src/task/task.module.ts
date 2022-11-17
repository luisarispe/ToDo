import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema
      }
    ])
  ],
  exports: [TaskService]
})
export class TaskModule { }
