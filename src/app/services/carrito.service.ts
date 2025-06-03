import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartDto } from '../models/cart.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'http://localhost:8080/api/carrito';

  private carritoSubject = new BehaviorSubject<CartDto | null>(null);
  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerCarrito(): Observable<CartDto> {
    return this.http.get<CartDto>(this.apiUrl).pipe(
      tap(data => this.carritoSubject.next(data))
    );
  }

  agregarProducto(productId: number, quantity: number): Observable<CartDto> {
    return this.http.post<CartDto>(`${this.apiUrl}/add`, null, {
      params: { productId: productId.toString(), quantity: quantity.toString() }
    }).pipe(
      tap(() => this.obtenerCarrito().subscribe())
    );
  }

  eliminarProducto(productId: number): Observable<CartDto> {
    return this.http.delete<CartDto>(`${this.apiUrl}/remove`, {
      params: { productId: productId.toString() }
    }).pipe(
      tap(() => this.obtenerCarrito().subscribe())
    );
  }

  vaciarCarrito(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`).pipe(
      tap(() => this.carritoSubject.next({ items: [] }))
    );
  }

  comprar(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/comprar`, {});
  }
}
