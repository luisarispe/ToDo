import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {

  private tasks: Task[] = [];
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    try {
      createTaskDto.task = createTaskDto.task.toLocaleLowerCase();
      let task: Task = await this.taskModel.create(createTaskDto);
      return task;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.tasks;
  }

  async findOne(id: string) {
    try {
      let task = await this.taskModel.findById({ _id: id });

      return task;
    } catch (error) {
      console.log(error);
    }

  }

  update(id: string, updateTaskDto: UpdateTaskDto) {

    let taskDB = this.findOne(id);

    // this.tasks = this.tasks.map(task => {

    //   if (task.id === id) {
    //     taskDB.createdAt = new Date();
    //     taskDB = { ...taskDB, ...updateTaskDto };
    //     return taskDB;
    //   }
    //   return task;
    // })
    return taskDB;

  }

  remove(id: string) {
    this.findOne(id)

    this.tasks = this.tasks.filter(task => {
      if (task.id !== id)
        return task
    })

    return `This action removes a #${id} task`;
  }
  private handleExceptions(error: any) {
    throw new InternalServerErrorException(`Can´t update/create Task - Check server logs`);
  }
}
