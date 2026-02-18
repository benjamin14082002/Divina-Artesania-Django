from rest_framework import serializers
from .models import Producto  # Importa el modelo desde la misma carpeta 'tienda'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'  # Esto incluye id, nombre, precio, stock, imagen, etc.