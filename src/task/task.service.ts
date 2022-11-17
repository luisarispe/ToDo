import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  private defaultLimit:number;
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    private readonly configService: ConfigService
  ) { 
    this.defaultLimit=configService.get<number>('defaultLimit');
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      let task: Task = await this.taskModel.create(createTaskDto);
      return task;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async createAll(createDto: CreateTaskDto[]) {
    try {
      let tasks = await this.taskModel.insertMany(createDto);
      return tasks;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    try {
      let { limit = this.defaultLimit, offset = 0 } = paginationDto;
      let tasks: Task[] = await this.taskModel.find().limit(limit).skip(offset).sort({
        _id: 1
      }).select('-__v');
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }

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
  async removeAll() {
    try {
      await this.taskModel.deleteMany();
    } catch (error) {
      throw new InternalServerErrorException(`Can´t delete tasks - Check server logs`);
    }
  }
  private handleExceptions(error: any) {
    throw new InternalServerErrorException(`Can´t update/create Task - Check server logs`);
  }
}
