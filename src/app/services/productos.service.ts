import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getAllProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getProductoPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getProductosPorCategoria(idCategoria: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/categoria/${idCategoria}`);
  }


}
