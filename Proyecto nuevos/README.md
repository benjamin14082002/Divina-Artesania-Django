# 🏺 Divina Artesanía - Sistema de Gestión de Inventario

Proyecto Full-Stack desarrollado como estudiante de 3er año de Ingeniería en Informática. Esta aplicación permite a un negocio local de Maipú gestionar su catálogo de productos de forma autónoma, segura y eficiente.



## 🚀 Funcionalidades Principales
* **Panel de Control Administrativo**: Interfaz privada para la gestión de productos, precios y stock en tiempo real.
* **Seguridad de Acceso**: Sistema de autenticación robusto mediante Django Auth, con redirecciones protegidas.
* **Validación de Ingeniería**: Control de integridad de datos que restringe la carga de imágenes a un máximo de 3MB para optimizar el almacenamiento del servidor.
* **UX/UI Responsiva**: Diseño adaptado para que el cliente pueda actualizar el stock desde su celular o computador.

## 🛠️ Tecnologías Utilizadas
* **Backend**: Python 3.x / Django 5.x
* **Frontend**: HTML5 / CSS3 (Custom Flexbox & Grid) / JavaScript
* **Base de Datos**: SQLite (Desarrollo)
* **Control de Versiones**: Git & GitHub

## 🛡️ Aspectos Técnicos Destacados
### Validación de Medios
Se implementó una lógica personalizada en el servidor para interceptar archivos corruptos o excesivamente pesados antes de su procesamiento, enviando feedback inmediato al usuario mediante el sistema de mensajes de Django.

### Seguridad de Sesión
El cierre de sesión se gestiona mediante peticiones POST para prevenir ataques CSRF, asegurando que la cuenta administrativa de Divina Artesanía permanezca protegida.

## 📦 Instalación y Uso
1. Clonar el repositorio:
   `git clone https://github.com/benjamin14082002/Divina-Artesania-Django.git`
2. Crear y activar entorno virtual:
   `python -m venv env` / `source env/bin/activate`
3. Instalar dependencias:
   `pip install django`
4. Ejecutar migraciones:
   `python manage.py migrate`
5. Iniciar servidor:
   `python manage.py runserver`