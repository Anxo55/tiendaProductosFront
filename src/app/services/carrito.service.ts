// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'http://localhost:8080/api/carrito';

  private carritoSubject = new BehaviorSubject<any>(null);
  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerCarrito(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(data => this.carritoSubject.next(data))
    );
  }

  agregarProducto(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, null, {
      params: { productId, quantity }
    }).pipe(
      tap(() => this.obtenerCarrito().subscribe())
    );
  }

  eliminarProducto(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove`, {
      params: { productId }
    }).pipe(
      tap(() => this.obtenerCarrito().subscribe())
    );
  }

  vaciarCarrito(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`).pipe(
      tap(() => this.carritoSubject.next({ items: [] }))
    );
  }
}
