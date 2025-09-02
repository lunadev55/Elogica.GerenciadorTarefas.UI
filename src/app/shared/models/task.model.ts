export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    projectId: string;
    assignedToId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum TaskStatus {
    TODO = 'Todo',
    IN_PROGRESS = 'In Progress',
    IN_REVIEW = 'In Review',
    DONE = 'Done',
    CANCELLED = 'Cancelled'
}