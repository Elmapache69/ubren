import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  icono: boolean = false;
  usuario = ""; // Email ingresado por el usuario
  clave = ""; // Contraseña ingresada por el usuario
  isModalOpen = false;

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  login() {
    // Obtener los usuarios registrados desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Buscar el usuario que coincide con el email y la contraseña
    const user = usuarios.find((u: any) => u.email === this.usuario && u.password === this.clave);

    if (user) {
      // Guardar los datos del usuario autenticado en localStorage
      localStorage.setItem('usuarioActual', JSON.stringify(user));

      // Mostrar un mensaje de bienvenida y redirigir al perfil
      console.log(`Bienvenido ${user.nombre}!`);
      this.router.navigate(['/perfil']);
    } else {
      // Mostrar un mensaje si las credenciales son incorrectas
      this.showToast("Usuario o contraseña incorrectos.");
    }
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

  async resetPass() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const user = usuarios.find((u: any) => u.email === this.usuario);

    if (user) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
      });
      await loading.present();

      const nuevaClave = Math.random().toString(36).slice(-6);
      user.password = nuevaClave;

      // Guardar la nueva clave en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      const body = {
        nombre: user.nombre, // Aseguramos que se use el nombre en el cuerpo
        app: "TeLlevoApp",
        clave: nuevaClave,
        email: user.email,
      };

      this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe(
          async (data) => {
            console.log("Respuesta del servidor:", data);
            await loading.dismiss();
            this.showToast('Correo de recuperación enviado.');
          },
          async (error) => {
            console.error("Error al enviar el correo:", error);
            await loading.dismiss();
            this.showToast('Hubo un problema al enviar el correo de recuperación.');
          }
        );
    } else {
      this.showToast("Usuario no encontrado.");
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
