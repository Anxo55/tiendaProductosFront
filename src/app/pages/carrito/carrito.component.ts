import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CartDto } from '../../models/cart.model';
import { Pedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  standalone:true,
  imports:[CommonModule, HttpClientModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: CartDto = { items: [] };
  loading = true;
  comprando = false;
  pedidoRealizado: Pedido | null = null;
  errorCompra: string | null = null;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.loading = true;
    this.carritoService.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  eliminarProducto(productId: number): void {
    this.carritoService.eliminarProducto(productId).subscribe({
      next: () => this.cargarCarrito()
    });
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito().subscribe({
      next: () => this.cargarCarrito()
    });
  }

  getTotal(): number {
    return this.carrito.items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  }

  comprar(): void {
    this.comprando = true;
    this.errorCompra = null;
    this.pedidoRealizado = null;

    this.carritoService.comprar().subscribe({
  next: () => {
    this.pedidoRealizado = null; // si quieres mostrar mensaje manual
    this.cargarCarrito();
    this.comprando = false;
  },
  error: (err) => {
    this.errorCompra = err.error?.message || err.message || 'Error desconocido';
    this.comprando = false;
  }
});

  }
}
