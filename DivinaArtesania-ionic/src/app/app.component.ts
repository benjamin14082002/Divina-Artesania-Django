import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp, IonTabs, IonTabBar, IonTabButton,
         IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { storefrontOutline, bagHandleOutline, logoWhatsapp } from 'ionicons/icons';
import { CartService } from './services/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonApp, IonTabs, IonTabBar, IonTabButton,
            IonIcon, IonLabel, IonBadge],
})
export class AppComponent {
  cartCount: Observable<number>;

  constructor(private cartService: CartService) {
    addIcons({ storefrontOutline, bagHandleOutline, logoWhatsapp });
    this.cartCount = this.cartService.getCartItemCount();
  }

  abrirWhatsApp() {
    window.open('https://wa.me/56933042260', '_blank');
  }
}