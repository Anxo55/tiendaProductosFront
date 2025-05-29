import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']  
})
export class PerfilComponent implements OnInit {

  userInfo: any = null;
  loading = true;

  backendUrl = 'http://localhost:8080';

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
      ? `${this.backendUrl}/uploads/${this.userInfo.imageUrl}`
      : 'https://via.placeholder.com/150';
  }
}
