# 🎨 Divina Artesanía - Ecosistema de E-commerce Omnicanal

### 📋 Descripción del Proyecto
Este proyecto es una solución tecnológica integral diseñada para digitalizar un emprendimiento artesanal en **Maipú, Chile**. El sistema permite una gestión sincronizada del inventario y ofrece múltiples canales de venta, asegurando que la artesana y sus clientes estén siempre conectados.

### 🛠️ Arquitectura Dual y Sincronizada
El ecosistema destaca por permitir transacciones y administración desde dos plataformas distintas que comparten una única fuente de verdad:

* **Portal Web (Django)**: 
    * **Punto de Venta**: Los usuarios pueden navegar por el catálogo y realizar compras directamente desde la web.
    * **Panel Administrativo**: Interfaz robusta para que la artesana gestione productos, stock y precios desde su computador.
    
* **Aplicación Móvil (Ionic/Angular)**: 
    * **Experiencia de Compra**: App híbrida optimizada para clientes con carrito de compras integrado.
    * **Gestión en Terreno**: Herramienta para la artesana que facilita la carga de productos y fotografías reales mediante la cámara del dispositivo.

### ✨ Especificaciones Técnicas
* **Core & API (Django REST Framework)**: Servidor central que gestiona la lógica de negocio, seguridad y persistencia de datos.
* **Cliente Móvil (Ionic/Angular)**: Interfaz desarrollada con TypeScript y Angular, comunicada mediante servicios HTTP.
* **Gestión Multimedia**: Implementación de carga de imágenes binarias mediante `FormData` para una actualización visual inmediata.
* **Base de Datos**: Sistema unificado que garantiza que una compra en la web actualice el stock en la app móvil y viceversa.

### 📂 Estructura del Repositorio
* `/frontend-ionic`: Código fuente de la aplicación móvil multiplataforma.
* `/backend-django`: Lógica del servidor, API y Portal Web de ventas/administración.

### 🛠️ Instalación Rápida
1. **Backend**: Clonar, crear venv, instalar dependencias de Django y correr `python manage.py runserver`.
2. **Frontend**: Clonar, ejecutar `npm install` e `ionic serve`.

---
*Proyecto desarrollado por Benjamín - Estudiante de 3er año de Ingeniería en Informática*.