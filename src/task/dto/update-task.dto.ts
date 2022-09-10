import { IsDate, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';
export class UpdateTaskDto {

    @IsString()
    @MinLength(3)
    @IsOptional()
    task: string;

    @IsDateString()
    @IsOptional()
    defeated: Date;
}
