import { IsDateString, IsEnum, IsString, MinLength } from "class-validator";
import { Status } from "../entities/task.entity";

export class CreateTaskDto {
    @IsString()
    @MinLength(3)
    task: string;
    @IsEnum(Status)
    status:Status;
    @IsDateString()
    defeated: Date;
}
