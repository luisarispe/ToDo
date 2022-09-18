export enum Status{
    Done='DONE',
    ToDo='TODO',
    Expired='EXPIRED'
}

export class Task {
    id: string;
    task: string;
    status: Status;
    defeated: Date;
    createdAt: Date;
}
