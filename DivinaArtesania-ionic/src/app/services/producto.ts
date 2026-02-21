import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}productos/`;

  constructor(private http: HttpClient) { }

  // Obtener productos para el catálogo del Home
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener un solo producto por ID — evita traer toda la lista
  getProductoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  /**
   * ACTUALIZACIÓN DE PRODUCTO
   * Cambiamos a .patch para evitar errores 400 (Bad Request) 
   * relacionados con el envío de imágenes o campos obligatorios.
   */
  // En src/app/services/producto.ts
updateProducto(id: number, datos: any): Observable<any> {
  // Si datos es un FormData, HttpClient se encarga de configurar 
  // las cabeceras 'multipart/form-data' automáticamente.
  return this.http.patch(`${this.apiUrl}${id}/`, datos);
}

  crearProducto(nuevoProducto: any): Observable<any> {
  return this.http.post(this.apiUrl, nuevoProducto);
}

updateProductoConImagen(id: number, formData: FormData): Observable<any> {
  // Django necesita recibir el objeto FormData para procesar la imagen correctamente
  return this.http.patch(`${this.apiUrl}${id}/`, formData);
}


deleteProducto(id: number): Observable<any> {
  // Django REST Framework espera el ID en la URL para borrar el registro exacto
  return this.http.delete(`${this.apiUrl}${id}/`);
}

}