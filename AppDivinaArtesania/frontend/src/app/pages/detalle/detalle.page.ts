import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetallePage implements OnInit {

  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.productoService.getProductos().subscribe({
        next: (res) => {
          // Buscamos el producto (como el Pocillo o la Manta) por su ID
          this.producto = res.find((p: any) => p.id == id);
        },
        error: (err) => {
          console.error('Error al conectar con Django:', err);
        }
      });
    }
  }

  // Nueva función para conectar con la artesana
  contactarArtesana() {
    if (this.producto) {
      const numero = '56933042260'; // Aquí pones el número de la artesana
      const mensaje = `Hola, estoy interesado en el producto "${this.producto.nombre}" que vi en la app.`;
      
      // Creamos la URL codificada para WhatsApp
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      
      // Abrimos el enlace en el sistema
      window.open(url, '_system');
    }
  }
}