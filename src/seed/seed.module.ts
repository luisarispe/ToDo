import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TaskModule]
})
export class SeedModule { }
