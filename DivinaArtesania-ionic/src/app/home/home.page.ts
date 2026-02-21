import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto';
import { CartService } from '../services/cart'; 
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons'; 
import { 
  colorPalette, hammer, shirt, brush, cart, 
  searchOutline, addCircle, removeCircle 
} from 'ionicons/icons';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
})
export class HomePage implements OnInit {
  listaProductos: any[] = [];
  productosFiltrados: any[] = [];
  cartItemCount: Observable<number>;

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private toastController: ToastController,
    private alertController: AlertController, // Inyectado para el PIN
    private router: Router // Inyectado para navegar al panel
  ) {
    addIcons({ 
      'color-palette': colorPalette, 'hammer': hammer, 'shirt': shirt, 
      'brush': brush, 'cart': cart, 'search-outline': searchOutline,
      'add-circle': addCircle, 'remove-circle': removeCircle
    });
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  ngOnInit() { this.cargarProductos(); }

  // NUEVA FUNCIÓN: Acceso secreto para la artesana
  async abrirAdmin() {
    const alert = await this.alertController.create({
      header: 'Panel Administrativo',
      subHeader: 'Ingrese el PIN de seguridad',
      inputs: [
        {
          name: 'pin',
          type: 'password',
          placeholder: 'PIN de 4 dígitos',
          attributes: {
            maxlength: 4
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ingresar',
          handler: (data) => {
            if (data.pin === environment.adminPin) {
              this.router.navigate(['/admin']);
            } else {
              this.presentarToastError();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentarToastError() {
    const toast = await this.toastController.create({
      message: 'PIN incorrecto. Acceso denegado.',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.listaProductos = res;
        this.productosFiltrados = res;
      },
      error: (err) => console.error('Error en disco D:', err)
    });
  }

  async agregarRapido(producto: any, event: Event) {
    event.stopPropagation();
    this.cartService.addProducto(producto);
    const toast = await this.toastController.create({
      message: `${producto.nombre} añadido`,
      duration: 1000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  quitarRapido(producto: any, event: Event) {
    event.stopPropagation();
    this.cartService.removeProducto(producto); 
  }

  buscarProducto(event: any) {
    const texto = event.target.value.toLowerCase();
    this.productosFiltrados = this.listaProductos.filter(p => 
      p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto)
    );
  }

  getIcono(categoria: string): string {
    const cat = (categoria || '').toLowerCase();
    if (cat.includes('ceramica')) return 'color-palette';
    if (cat.includes('tejidos')) return 'shirt';
    if (cat.includes('madera')) return 'hammer';
    return 'brush'; 
  }

  doRefresh(event: any) {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.listaProductos = res;
        this.productosFiltrados = res;
        event.target.complete();
      },
      error: () => event.target.complete()
    });
  }
}