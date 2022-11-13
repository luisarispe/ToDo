import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/task.service';
import { Status } from '../task/entities/task.entity';

@Injectable()
export class SeedService {
  tasks: CreateTaskDto[] = [];

  constructor(private readonly taskService: TaskService) {
    this.tasks = [
      {
        task: 'Llamar a Papá',
        status: Status.Done,
        defeated: new Date()
      },
      {
        task: 'Llamar a Mamá',
        status: Status.Expired,
        defeated: new Date()
      },
      {
        task: 'Buscar Empleo',
        status: Status.ToDo,
        defeated: new Date()
      },
      {
        task: 'Realizar tramite',
        status: Status.Expired,
        defeated: new Date()
      },
      {
        task: 'Hacer ejercicios',
        status: Status.ToDo,
        defeated: new Date()
      },
      {
        task: 'Estudiar Nest',
        status: Status.ToDo,
        defeated: new Date()
      }
    ];
  }

  async executeSeed() {
    await this.taskService.removeAll()
    let tasks = await this.taskService.createAll(this.tasks);
    return tasks;
  }

}
