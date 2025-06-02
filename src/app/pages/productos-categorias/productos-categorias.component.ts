import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos-categorias.component.html',
  styleUrl: './productos-categorias.component.css'
})
export class ProductosCategoriasComponent implements OnInit {

  productos: any[] = [];
  categoriaNombre: string = '';
  loading = true;
  categoriaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));

    this.productosService.getProductosPorCategoria(this.categoriaId).subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos de la categoría:', err);
        this.loading = false;
      }
    });

    this.categoriasService.getCategoriaPorId(this.categoriaId).subscribe({
      next: (data) => this.categoriaNombre = data.name,
      error: (err) => console.error('Error obteniendo nombre de la categoría', err)
    });
  }
}
