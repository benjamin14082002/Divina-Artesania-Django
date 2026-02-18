from django.contrib import admin
from .models import Producto

# Personalización del título del panel para el cliente
admin.site.site_header = "Panel de Gestión - Divina Artesanía"
admin.site.site_title = "Administración Divina Artesanía"
admin.site.index_title = "Bienvenido al Gestor de tu Tienda"

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    # Campos que se ven en la tabla principal
    list_display = ('nombre', 'categoria', 'precio', 'stock', 'disponible')
    
    # PERMITE EDITAR EL STOCK DIRECTAMENTE DESDE LA LISTA (Súper útil para el cliente)
    list_editable = ('precio', 'stock', 'disponible')
    
    # Filtros laterales para que no se pierda entre productos
    list_filter = ('categoria', 'disponible')
    
    # Buscador por nombre
    search_fields = ('nombre',)
    
    # Orden predeterminado (por nombre)
    ordering = ('nombre',)

    # Organización del formulario de edición para que sea más limpio
    fieldsets = (
        ('Información Básica', {
            'fields': ('nombre', 'descripcion', 'categoria')
        }),
        ('Precio e Inventario', {
            'fields': ('precio', 'stock', 'disponible')
        }),
        ('Imagen del Producto', {
            'fields': ('imagen',)
        }),
    )