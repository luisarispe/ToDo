import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";


export enum Status {
    Done = 'DONE',
    ToDo = 'TODO',
    Expired = 'EXPIRED'
}

@Schema({ timestamps: true })
export class Task extends Document {

    @Prop({
        required: true,
        trim: true,
        lowercase: true
    })
    task: string;
    @Prop({
        required: true,
    })
    status: Status;
    @Prop({
        required: true
    })
    defeated: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
