import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {
    // Recuperar carrito guardado al iniciar la app
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartItemCount.next(this.getTotalItems());
    }
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addProducto(producto: any) {
    // Revisar si el producto ya está en el carrito
    let added = false;
    for (let p of this.cart) {
      if (p.id === producto.id) {
        p.cantidad += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push({ ...producto, cantidad: 1 });
    }
    
    this.saveCart();
  }

  removeProducto(producto: any) {
    this.cart = this.cart.filter(p => p.id !== producto.id);
    this.saveCart();
  }

  private getTotalItems() {
    return this.cart.reduce((total, p) => total + p.cantidad, 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartItemCount.next(this.getTotalItems());
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}