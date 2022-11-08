import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";


export enum Status {
    Done = 'DONE',
    ToDo = 'TODO',
    Expired = 'EXPIRED'
}

@Schema()
export class Task extends Document {

    @Prop({
        required: true
    })
    task: string;
    @Prop({
        required: true
    })
    status: Status;
    @Prop({
        required: true
    })
    defeated: Date;
    @Prop({
        required: true,
        default: Date.now
    })
    createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
