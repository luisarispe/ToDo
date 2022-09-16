export enum Status{
    Done=1,
    ToDo=2  ,
    Expired=3
}

export class Task {
    id: string;
    task: string;
    status: Status;
    defeated: Date;
    createdAt: Date;
}
