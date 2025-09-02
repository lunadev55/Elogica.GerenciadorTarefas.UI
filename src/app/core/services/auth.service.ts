import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, User, UserStatus } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7181/api/Auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: AuthRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.success) {     
          const user: User = {
            email: response.data.data.email,
            username: response.data.data.name,
            userRole: response.data.data.role,
            id: response.data.data.id,
            phone: '',
            userStatus: UserStatus.Active,
            createdAt: '',
            updatedAt: null
          };
          
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.userRole === 'Admin';
  }
}