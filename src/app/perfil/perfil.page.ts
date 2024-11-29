import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  icono: boolean = false;
  usuario: any = {};
  cantidadViajes: number = 0;
  rolSeleccionado: string = ''; // Rol actual del usuario

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener datos del usuario actual desde localStorage
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
      this.usuario = JSON.parse(usuarioActual);

      // Obtener el rol seleccionado previamente
      this.rolSeleccionado = localStorage.getItem(`rol_${this.usuario.email}`) || '';

      // Obtener la cantidad de viajes realizados
      this.cantidadViajes = parseInt(localStorage.getItem(`viajes_${this.usuario.email}`) || '0', 10);
    } else {
      console.error('No hay un usuario logueado.');
    }
  }

  guardarRol() {
    if (this.rolSeleccionado === 'pasajero') {
      // Si cambia a pasajero, eliminar el viaje registrado
      localStorage.removeItem(`viaje_${this.usuario.email}`);
      console.log('Viaje eliminado para el usuario pasajero.');
    }
    // Guardar el rol seleccionado en localStorage
    localStorage.setItem(`rol_${this.usuario.email}`, this.rolSeleccionado);
    console.log(`Rol guardado: ${this.rolSeleccionado}`);
  }

  cambiarTema() { this.icono = !this.icono;
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

  crearViaje() {
    // Navegar a la página de creación de viajes
    this.router.navigate(['/crear-viaje']);
  }
}
