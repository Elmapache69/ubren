import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.page.html',
  styleUrls: ['./solicitar.page.scss'],
})
export class SolicitarPage implements OnInit {
  icono: boolean = false;
  viajes: any[] = []; // Lista de viajes disponibles

  constructor(private platform: Platform) {}

  ngOnInit() {
    // Cargar los viajes desde localStorage
    this.cargarViajes();
  }

  cargarViajes() {
    const viajesGuardados = JSON.parse(localStorage.getItem('viajes') || '[]');
    this.viajes = viajesGuardados;
    console.log('Viajes cargados:', this.viajes);
  }

  cambiarTema() {
    this.icono = !this.icono;
    if (this.icono) {
      // Tema oscuro
      document.documentElement.style.setProperty('--fondo', '#212121');
      document.documentElement.style.setProperty('--texto', '#ffffff');
      document.documentElement.style.setProperty('--fondo-input', '#424242');
      document.documentElement.style.setProperty('--texto-input', '#ffffff');
    } else {
      // Tema claro
      document.documentElement.style.setProperty('--fondo', '#ffffff');
      document.documentElement.style.setProperty('--texto', '#000000');
      document.documentElement.style.setProperty('--fondo-input', '#f7f7f7');
      document.documentElement.style.setProperty('--texto-input', '#000000');
    }
  }
}
