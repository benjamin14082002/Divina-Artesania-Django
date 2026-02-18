# 🎨 Divina Artesanía - Gestión de Inventario Full-Stack

### 📋 Descripción del Proyecto
Este ecosistema digital fue diseñado para automatizar y profesionalizar la gestión de productos de un emprendimiento artesanal en **Maipú, Chile**. El sistema permite a la artesana administrar su catálogo en tiempo real, controlando stock, precios e imágenes directamente desde su dispositivo móvil.

### 🛠️ Arquitectura y Tecnologías
El proyecto se divide en dos grandes módulos comunicados mediante una API REST:

* **Frontend (App Móvil)**: Desarrollado con **Ionic Framework** y **Angular**. Utiliza servicios inyectables para la comunicación HTTP y manejo de estados.
* **Backend (API)**: Construido con **Django REST Framework (DRF)**. Gestiona la lógica de negocio, la base de datos y el almacenamiento de archivos multimedia.
* **Lenguajes**: TypeScript (Frontend) y Python (Backend).

### 🚀 Funcionalidades Clave
* **Ciclo CRUD Completo**: Creación, visualización, edición y eliminación de productos con validaciones de servidor.
* **Gestión Multimedia**: Implementación de carga de imágenes reales mediante el protocolo `FormData`.
* **Sincronización en Red Local**: Configurado para operar entre un PC servidor y dispositivos móviles conectados a la misma red.
* **Interfaz de Administración**: Panel intuitivo con confirmaciones de seguridad (`AlertController`) para evitar errores en el inventario.

### 📂 Estructura del Repositorio
* `/frontend-ionic`: Código fuente de la aplicación móvil.
* `/backend-django`: Lógica de servidor y API.

### 🛠️ Instalación y Configuración

#### Backend:
1. Navegar a `/backend-django`.
2. Crear entorno virtual: `python -m venv venv`.
3. Instalar dependencias: `pip install django djangorestframework django-cors-headers`.
4. Ejecutar servidor: `python manage.py runserver 0.0.0.0:8000`.

#### Frontend:
1. Navegar a `/frontend-ionic`.
2. Instalar dependencias: `npm install`.
3. Ejecutar app: `ionic serve`.

---
*Proyecto desarrollado por Benjamín - Estudiante de 3er año de Ingeniería en Informática*.