import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (msg) => {
        this.successMessage = 'Usuario registrado exitosamente. Por favor, inicia sesión.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.errorMessage = 'Error al registrar usuario. Intenta de nuevo.';
      }
    });
  }

}
