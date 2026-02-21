from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'), # Esto llama a la función home de tus views

    path('dashboard/', views.dashboard, name='dashboard'), # Vista para el cliente
    path('actualizar_stock/<int:producto_id>/', views.actualizar_stock, name='actualizar_stock'), # Ruta para actualizar el stock
    path('crear_producto/', views.crear_producto, name='crear_producto'), # Ruta para crear un nuevo producto
    path('eliminar_producto/<int:producto_id>/', views.eliminar_producto, name='eliminar_producto'), # Ruta para eliminar un producto
    path('editar_producto/<int:producto_id>/', views.editar_producto, name='editar_producto'), # Ruta para editar un producto completo
]