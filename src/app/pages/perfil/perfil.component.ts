import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  userInfo: any = null;
  loading = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.userInfo = user;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.loading = false;
      }
    });
  }

  get imageUrl(): string {
    return this.userInfo?.imageUrl
      ? this.userInfo.imageUrl
      : 'https://via.placeholder.com/150';
  }
}
