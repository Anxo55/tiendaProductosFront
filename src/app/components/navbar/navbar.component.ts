import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private tokenSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tokenSub = this.authService.token$.subscribe(token => {
      console.log('NavbarComponent: token cambiado, nuevo estado:', !!token);
      this.isLoggedIn = !!token;
      this.cdr.detectChanges(); // fuerza la detección del cambio en el DOM
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
    }
  });
}


  ngOnDestroy() {
    if (this.tokenSub) {
      this.tokenSub.unsubscribe();
    }
  }
}
