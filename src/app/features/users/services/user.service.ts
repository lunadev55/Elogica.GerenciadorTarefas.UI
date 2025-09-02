import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest, UserApiResponse, UserRole, UserStatus } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  private apiUrl = 'https://localhost:7181/api/Users';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, pageSize: number = 10): Observable<{
    data: User[];
    totalItems: number;
    currentPage: number;
  }> {
    return this.http.get<UserApiResponse<User>>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`)
      .pipe(
        map(response => ({
          data: response.data.data.data,
          totalItems: response.data.data.totalItems,
          currentPage: response.data.data.currentPage
        }))
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userData: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, {
      username: userData.username,
      password: userData.password,
      phone: userData.phone,
      email: userData.email,
      userStatus: userData.status || UserStatus.Active,
      userRole: userData.role || UserRole.Common
    });
  }

  updateUser(id: number, userData: UpdateUserRequest): Observable<User> {
    type UpdateData = {
      username: string;
      email: string;
      phone?: string;
      userStatus: UserStatus;
      userRole: UserRole;
      password?: string;
    };

    const updateData: UpdateData = {
      username: userData.username,  
      email: userData.email,
      phone: userData.phone,
      userStatus: userData.userStatus,
      userRole: userData.userRole
    };

    if (userData.password) {
      updateData['password'] = userData.password;
    }

    return this.http.put<User>(`${this.apiUrl}/${id}`, updateData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}