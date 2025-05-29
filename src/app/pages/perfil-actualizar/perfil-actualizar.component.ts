import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './perfil-actualizar.component.html',
  styleUrls: ['./perfil-actualizar.component.css']
})
export class PerfilActualizarComponent implements OnInit{

  userForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.userId = user.id;

        this.userForm = this.fb.group({
          username: [user.username, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
        });
      },
      error: () => {
        this.errorMessage = 'Error al cargar datos del usuario';
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const datosActualizados = this.userForm.value;

    this.authService.updateUser(this.userId, datosActualizados).subscribe({
      next: () => {
        this.successMessage = 'Perfil actualizado correctamente';
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al actualizar el perfil';
        this.loading = false;
      }
    });
  }

}
