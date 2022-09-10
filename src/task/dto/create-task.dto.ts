import { IsDateString, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(3)
    task: string;

    @IsDateString()
    defeated: Date;
}
