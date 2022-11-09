import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    let task = await this.taskModel.findById({ _id: id });

    if (!task) throw new BadRequestException(`Task with id "${id}" not found`);

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {

    await this.findOne(id);
    try {
      let taskUpdate = await this.taskModel.findByIdAndUpdate({ _id: id }, updateTaskDto, { new: true });
      return taskUpdate;
    } catch (error) {
      this.handleExceptions(error);
    }


  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      let task = await this.taskModel.findByIdAndDelete(id);
      return task;
    } catch (error) {
      throw new InternalServerErrorException(`Can´t delete Task - Check server logs`);
    }
  }
  private handleExceptions(error: any) {
    throw new InternalServerErrorException(`Can´t update/create Task - Check server logs`);
  }
}
