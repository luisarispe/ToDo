import { IsDate, IsOptional, IsString, MinLength, IsDateString, IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';
export class UpdateTaskDto {

    @IsString()
    @MinLength(3)
    @IsOptional()
    task: string;
    @IsEnum(Status)
    @IsOptional()
    status:Status;
    @IsDateString()
    @IsOptional()
    defeated: Date;
}
