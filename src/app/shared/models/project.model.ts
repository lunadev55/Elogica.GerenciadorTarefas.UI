export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;  
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  NotStarted = 0,
  InProgress = 1,
  OnHold = 2,
  Completed = 3,
  Cancelled = 4  
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  userId: string;
}

export interface UpdateProjectRequest extends CreateProjectRequest {
  id: string;
}