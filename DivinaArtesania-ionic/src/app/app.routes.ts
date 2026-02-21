import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./pages/detalle/detalle.page').then(m => m.DetallePage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.page').then(m => m.CartPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then(m => m.AdminPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
];