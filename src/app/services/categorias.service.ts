import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://localhost:8080/api/categorias'

  constructor(private http: HttpClient) { }

    getAllCategories(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getCategoriaPorId(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

}
