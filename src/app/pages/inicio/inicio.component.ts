import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule ,RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  username: string | null = null;
  mostrarMensaje = false;

  ngOnInit(): void {
    const userStr = localStorage.getItem('usuario');
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
      this.username = user.username || user.name || null;
    }

    const mostrar = sessionStorage.getItem('mostrarBienvenida');
    if (mostrar === 'true') {
      this.mostrarMensaje = true;
      sessionStorage.removeItem('mostrarBienvenida'); // solo se muestra una vez
    }

    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 4000); // Oculta el mensaje después de 4 segundos

  }

  cerrarMensaje() {
  this.mostrarMensaje = false;
}
}
