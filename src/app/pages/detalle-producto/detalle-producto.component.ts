import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{

  producto: any;
  loading = true;
  error: string = '';

  constructor(private route: ActivatedRoute, private productosService: ProductosService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoPorId(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando producto:', err);
        this.error = 'No se pudo cargar el producto.';
        this.loading = false;
      }
    });
  }

}
