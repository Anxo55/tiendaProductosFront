import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  loading = true;

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loading = false;
      }
    });
  }

  agregarAlCarrito(productId: number) {
    this.carritoService.agregarProducto(productId, 1).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Añadido',
          text: 'Producto añadido a la cesta',
          timer: 1200,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al añadir a la cesta:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes iniciar sesión para añadir productos a la cesta'
        });
      }
    });
  }
}
