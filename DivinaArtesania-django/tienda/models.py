from django.db import models

class Producto(models.Model):
    CATEGORIAS = [
        ('CERAMICA', 'Cerámica'),
        ('TEJIDOS', 'Tejidos'),
        ('MADERA', 'Madera'),
        ('OTRO', 'Otro'),
    ]

    nombre = models.CharField(max_length=100, verbose_name="Nombre del Producto")
    descripcion = models.TextField(verbose_name="Descripción")
    precio = models.IntegerField(verbose_name="Precio de Venta")
    
    # Campo de imagen (ya configurado)
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True, verbose_name="Foto del Producto")
    
    categoria = models.CharField(
        max_length=20, 
        choices=CATEGORIAS, 
        default='CERAMICA',
        verbose_name="Categoría"
    )

    # --- NUEVOS CAMPOS PARA EL CLIENTE ---
    stock = models.PositiveIntegerField(default=1, verbose_name="Cantidad en Inventario")
    disponible = models.BooleanField(default=True, verbose_name="¿Está a la venta?")

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return f"{self.nombre} - Stock: {self.stock}"