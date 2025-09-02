import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../../../shared/models/project.model';
import { ApiResponse, ApiResponseWithData, ApiWrappedResponse, PaginatedData } from '../../../shared/models/api-response.model';

interface CreateProjectResponse {
  id: string;
  message: string;
  createdAt: string;
}

interface UpdateProjectResponse {
  id: string;
  message: string;
  updatedAt: string;
}

interface GetProjectByIdResponse {
  id: string;
  username: string;
  description: string;
  startDate: string;
  endDate: string;
  status: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://localhost:7181/api/Projects';

  constructor(private http: HttpClient) {}

  getProjects(page: number = 1, pageSize: number = 10): Observable<PaginatedData<Project>> {
    return this.http.get<ApiWrappedResponse<Project>>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`)
      .pipe(
        map(response => response.data.data)
      );
  }

  getProject(id: string): Observable<ApiResponseWithData<GetProjectByIdResponse>> {
    return this.http.get<ApiResponseWithData<GetProjectByIdResponse>>(`${this.apiUrl}/${id}`);
  }

  createProject(project: CreateProjectRequest): Observable<ApiResponseWithData<CreateProjectResponse>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    project.userId = currentUser.id;

    return this.http.post<ApiResponseWithData<CreateProjectResponse>>(this.apiUrl, project);
  }

  updateProject(project: UpdateProjectRequest): Observable<ApiResponseWithData<UpdateProjectResponse>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    project.userId = currentUser.id;
    
    return this.http.put<ApiResponseWithData<UpdateProjectResponse>>(`${this.apiUrl}/${project.id}`, project);
  }

  deleteProject(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}