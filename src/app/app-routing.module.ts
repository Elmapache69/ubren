import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',  // Redirige a 'home' cuando la ruta esté vacía
    pathMatch: 'full'
  },
  {
    path: 'home',  // Ruta para 'home'
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registro',  // Ruta para 'registro'
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  
  {
    path: 'perfil',  // Ruta para 'perfil'
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'solicitar',  // Ruta para 'solicitar'
    loadChildren: () => import('./solicitar/solicitar.module').then(m => m.SolicitarPageModule)
  },
  {
    path: 'crear-viaje',
    loadChildren: () => import('./crear-viaje/crear-viaje.module').then( m => m.CrearViajePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
