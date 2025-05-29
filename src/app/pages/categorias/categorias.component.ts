import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit{

  categorias: any[] = [];
    loading = true;
  
    constructor(private categoriasService: CategoriasService) {}
  
    ngOnInit(): void {
      this.categoriasService.getAllCategories().subscribe({
        next: (data) => {
          this.categorias = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar las categorias:', err);
          this.loading = false;
        }
      });
    }

}
