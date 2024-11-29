import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  email: string = '';
  rut: string = '';
  password: string = '';
  confirmPassword: string = '';
  icono: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router 
  ) {}

  async registrar() {
    // Validar que todos los campos estén completos
    if (!this.nombre || !this.email || !this.rut || !this.password || !this.confirmPassword) {
      await this.showAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Obtener usuarios existentes en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar si el correo ya está registrado
    if (usuarios.some((u: any) => u.email === this.email)) {
      await this.showAlert('Error', 'El correo ya está registrado.');
      return;
    }

    // Crear un nuevo usuario
    const usuario = {
      nombre: this.nombre.trim(),
      email: this.email.trim(),
      rut: this.rut.trim(),
      password: this.password.trim(),
    };

    // Guardar el nuevo usuario en localStorage
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar mensaje de éxito y redirigir al login
    await this.showAlert('Registro exitoso', 'Usuario registrado correctamente.');
    this.router.navigate(['/home']);
  }

  esRegistroValido(): boolean {
    // Validar si todos los campos están completos y las contraseñas coinciden
    return (
      this.nombre.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.rut.trim().length > 0 &&
      this.password.trim().length > 0 &&
      this.confirmPassword.trim().length > 0 &&
      this.password === this.confirmPassword
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
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
