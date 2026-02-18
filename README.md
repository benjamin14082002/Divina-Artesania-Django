# 🎨 Divina Artesanía - Ecosistema Digital Full-Stack

### 📋 Descripción del Proyecto
Este ecosistema integra una solución móvil y web para la digitalización total de un emprendimiento artesanal. El sistema permite la gestión administrativa bidireccional y ofrece una experiencia de compra fluida para los usuarios finales.

### 🛠️ Arquitectura de Roles y Plataformas
El proyecto destaca por su capacidad de sincronización entre múltiples interfaces:

* **Gestión Administrativa (Django Web & Ionic App)**: 
    * La artesana puede gestionar el catálogo (CRUD completo) indistintamente desde la **web de Django** o desde la **app móvil de Ionic**.
    * Permite la actualización de stock, precios y fotografías en tiempo real para ambos canales.
* **Experiencia del Cliente (Ionic App)**:
    * Cualquier usuario puede navegar por el catálogo actualizado.
    * Implementación de **Carrito de Compras** funcional para que los clientes realicen pedidos directamente desde la aplicación.

### 🚀 Especificaciones Técnicas
* **Core (Django)**: Actúa como servidor central, API REST y portal web administrativo.
* **Cliente (Ionic/Angular)**: Aplicación híbrida con lógica diferenciada para administración y ventas.
* **Sincronización**: Uso de `FormData` para asegurar que las modificaciones de productos (incluyendo imágenes) se reflejen instantáneamente en todas las plataformas.

### 📂 Estructura del Repositorio
* `/frontend-ionic`: Aplicación móvil (Compra para clientes + Gestión para artesana).
* `/backend-django`: Servidor central y Portal Web Administrativo.

---
*Proyecto desarrollado por Benjamín - 3er año de Ingeniería en Informática*.