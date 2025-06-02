import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  cantidadItems = 0;

  private tokenSub!: Subscription;
  private carritoSub!: Subscription;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Suscribirse al token para saber si el usuario está logueado
    this.tokenSub = this.authService.token$.subscribe(token => {
      this.isLoggedIn = !!token;
      this.cdr.detectChanges();

      // Si está logueado, obtenemos el carrito
      if (this.isLoggedIn) {
        this.carritoService.obtenerCarrito().subscribe();
      }
    });

    // Suscribirse al carrito para contar ítems
    this.carritoSub = this.carritoService.carrito$.subscribe(carrito => {
      if (carrito && carrito.items) {
        this.cantidadItems = carrito.items.reduce(
          (total: number, item: any) => total + item.quantity, 0
        );
      } else {
        this.cantidadItems = 0;
      }
      this.cdr.detectChanges();
    });
  }

  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.cantidadItems = 0; // Limpiar contador al cerrar sesión
      }
    });
  }

  ngOnDestroy() {
    if (this.tokenSub) this.tokenSub.unsubscribe();
    if (this.carritoSub) this.carritoSub.unsubscribe();
  }
}
