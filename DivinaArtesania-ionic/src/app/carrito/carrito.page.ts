import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../services/cart'; 

// IMPORTACIONES PARA ICONOS (Evita errores de consola)
import { addIcons } from 'ionicons';
import { trash, logoWhatsapp, cartOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CartPage implements OnInit {
  items: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {
    addIcons({ trash, 'logo-whatsapp': logoWhatsapp, 'cart-outline': cartOutline, 'arrow-back-outline': arrowBackOutline });
  }

  ngOnInit() {}

  // ionViewWillEnter se ejecuta CADA VEZ que el usuario entra a la página,
  // a diferencia de ngOnInit que solo se ejecuta la primera vez.
  ionViewWillEnter() {
    this.items = this.cartService.getCart();
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.total = this.items.reduce((prev, curr) => prev + (curr.precio * curr.cantidad), 0);
  }

  eliminarProducto(producto: any) {
    this.cartService.removeProducto(producto);
    this.items = this.cartService.getCart();
    this.actualizarTotal();
  }

  enviarPedido() {
    let mensaje = "¡Hola! Me gustaría encargar los siguientes productos de Divina Artesanía:%0A%0A";
    this.items.forEach(p => {
      mensaje += `• ${p.cantidad}x ${p.nombre} ($${p.precio * p.cantidad})%0A`;
    });
    mensaje += `%0A*Total: $${this.total}*`;
    
    const telefono = "56933042260"; 
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  }
}