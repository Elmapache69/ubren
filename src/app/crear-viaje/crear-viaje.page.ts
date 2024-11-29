import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {
  viaje = {
    origen: 'DuocUC Melipilla', // Origen predeterminado
    destino: '',
    fecha: ''
  };

  usuario: any = {}; // Propiedad para almacenar los datos del usuario
  rolSeleccionado: string = ''; // Rol actual del usuario
  icono: boolean = false; // Estado del tema (claro/oscuro)

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener datos del usuario actual desde localStorage
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
      this.usuario = JSON.parse(usuarioActual);

      // Obtener el rol del usuario
      this.rolSeleccionado = localStorage.getItem(`rol_${this.usuario.email}`) || '';
    } else {
      console.error('No hay un usuario logueado.');
    }
  }

  guardarRol() {
    // Guardar el rol seleccionado en localStorage
    localStorage.setItem(`rol_${this.usuario.email}`, this.rolSeleccionado);
    console.log(`Rol guardado: ${this.rolSeleccionado}`);
  }

  guardarViaje() {
    if (this.viaje.destino && this.viaje.fecha) {
      // Guardar el viaje en localStorage con el conductor
      const viajeRegistrado = {
        ...this.viaje,
        conductor: this.usuario.nombre
      };

      const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
      viajes.push(viajeRegistrado);
      localStorage.setItem('viajes', JSON.stringify(viajes));

      alert('Viaje creado exitosamente');
      this.router.navigate(['/perfil']);
    } else {
      alert('Por favor completa todos los campos');
    }
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
