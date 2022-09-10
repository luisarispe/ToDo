import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

import { v4 as uuid } from "uuid";

@Injectable()
export class TaskService {

  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    const task: Task = {
      id: uuid(),
      task: createTaskDto.task.toLocaleLowerCase(),
      defeated: createTaskDto.defeated,
      createdAt: new Date()
    }
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find(task => task.id === id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`)

    return task
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {

    let taskDB = this.findOne(id);

    this.tasks = this.tasks.map(task => {

      if (task.id === id) {
        taskDB.createdAt = new Date();
        taskDB = { ...taskDB, ...updateTaskDto };
        return taskDB;
      }
      return task;
    })
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
}
