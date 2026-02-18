import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // Cambiamos 'detalle' por 'detalle/:id'
    path: 'detalle/:id', 
    loadComponent: () => import('./pages/detalle/detalle.page').then( m => m.DetallePage)
  },
  {

  path: 'carrito',
  loadComponent: () => import('./carrito/carrito.page').then(m => m.CartPage)

  },

  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  
];