import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private userUrl = 'http://localhost:8080/api/usuarios/perfil';
  private tokenKey = 'auth/token'; // 🔧 Clave consistente

  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromLocalStorage());
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setTokenToLocalStorage(token: string | null): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        const token = response.token || response.data?.token || response.accessToken || response.jwt;
        if (!token) throw new Error('No se encontró token en la respuesta');
        this.setTokenToLocalStorage(token);
        this.tokenSubject.next(token);
      }),
      switchMap(() => this.getUserProfile()),
      tap(profile => {
        console.log('Perfil de usuario:', profile);
        localStorage.setItem('usuario', JSON.stringify(profile));
        sessionStorage.setItem('mostrarBienvenida', 'true');
      }),
      map(() => {}),
      catchError(err => {
        console.error('Error durante login:', err);
        throw err;
      })
    );
  }

  register(username: string, email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, { username, email, password });
  }

  logout(): void {
    this.setTokenToLocalStorage(null);
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/usuarios/${id}`, data);
  }

  // 🔄 Opcional: para leer roles directamente del JWT
  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return [];
    }
  }
}
