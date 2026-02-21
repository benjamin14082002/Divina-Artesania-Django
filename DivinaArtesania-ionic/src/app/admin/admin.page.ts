import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { ProductoService } from '../services/producto';
import { addIcons } from 'ionicons';
import { 
  saveOutline, cubeOutline, cashOutline, 
  refreshOutline, searchOutline, add, 
  cameraOutline, trashOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminPage implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(
    private productoService: ProductoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ 
      'save-outline': saveOutline, 
      'cube-outline': cubeOutline, 
      'cash-outline': cashOutline,
      'refresh-outline': refreshOutline,
      'search-outline': searchOutline,
      'add': add,
      'camera-outline': cameraOutline,
      'trash-outline': trashOutline
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
        this.productosFiltrados = res;
      },
      error: (err) => {
        console.error('Error al cargar:', err);
        this.presentarToast('Error al conectar con el servidor', 'danger');
      }
    });
  }

  buscarProducto(event: any) {
    const texto = event.target.value.toLowerCase();
    this.productosFiltrados = this.productos.filter(p => 
      p.nombre.toLowerCase().includes(texto) || p.categoria.toString().toLowerCase().includes(texto)
    );
  }

  seleccionarImagen(event: any, producto: any) {
    const file = event.target.files[0];
    if (file) {
      producto.archivoNuevo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => producto.imagen = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  async agregarProducto() {
    const nuevo = {
      nombre: "Nueva Artesania",
      precio: 1000,
      stock: 1,
      descripcion: "Producto nuevo por editar",
      categoria: 'CERAMICA', 
      imagen: null 
    };

    this.productoService.crearProducto(nuevo).subscribe({
      next: () => {
        this.presentarToast('¡Producto base creado!', 'success');
        this.cargarProductos(); 
      },
      error: (err) => {
        console.log('Error 400:', err.error);
        this.presentarToast('No se pudo crear el producto', 'danger');
      }
    });
  }

  async guardarCambios(producto: any) {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('stock', producto.stock.toString());
    formData.append('categoria', producto.categoria);
    formData.append('descripcion', producto.descripcion || 'Sin descripción');

    if (producto.archivoNuevo) {
      formData.append('imagen', producto.archivoNuevo);
    }

    this.productoService.updateProducto(producto.id, formData).subscribe({
      next: () => {
        this.presentarToast(`¡${producto.nombre} actualizado!`, 'success');
        producto.archivoNuevo = null;
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.presentarToast('Error al guardar los cambios', 'danger');
      }
    });
  }

  // MÉTODO PARA ELIMINAR PRODUCTO CON CONFIRMACIÓN
  async eliminarProducto(producto: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar "${producto.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.productoService.deleteProducto(producto.id).subscribe({
              next: () => {
                this.presentarToast('Producto eliminado correctamente', 'success');
                this.cargarProductos();
              },
              error: (err) => {
                console.error('Error al borrar:', err);
                this.presentarToast('No se pudo eliminar el registro', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentarToast(msj: string, color: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}