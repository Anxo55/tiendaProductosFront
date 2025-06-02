// src/app/pages/carrito/carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  carrito: any = null;
  loading = true;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    this.loading = true;
    this.carritoService.obtenerCarrito().subscribe({
      next: data => {
        this.carrito = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error al cargar el carrito:', err);
        this.loading = false;
      }
    });
  }

  eliminarProducto(productId: number) {
    this.carritoService.eliminarProducto(productId).subscribe({
      next: () => this.obtenerCarrito(),
      error: err => console.error('Error eliminando producto:', err)
    });
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito().subscribe({
      next: () => this.obtenerCarrito(),
      error: err => console.error('Error vaciando carrito:', err)
    });
  }
}
