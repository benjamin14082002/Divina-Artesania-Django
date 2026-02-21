import os
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages  # Necesario para enviar alertas al dashboard
from .models import Producto 

# --- VISTA PÚBLICA ---
def home(request):
    """
    Muestra solo los productos que tienen stock y están marcados como disponibles.
    """
    productos_visibles = Producto.objects.filter(disponible=True, stock__gt=0)
    return render(request, 'tienda/index.html', {'productos': productos_visibles})

# --- VISTAS DE GESTIÓN PARA EL CLIENTE ---

@login_required
def dashboard(request):
    """
    Panel privado donde el cliente ve todo su inventario.
    """
    productos = Producto.objects.all()
    return render(request, 'tienda/dashboard.html', {'productos': productos})

@login_required
def crear_producto(request):
    """
    Crea un nuevo producto validando el tamaño y formato de la imagen.
    """
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion')
        precio = request.POST.get('precio')
        stock = request.POST.get('stock')
        categoria = request.POST.get('categoria')
        imagen = request.FILES.get('imagen')

        # VALIDACIÓN: Tamaño de Imagen (3MB = 3 * 1024 * 1024 bytes)
        if imagen:
            if imagen.size > 3 * 1024 * 1024:
                messages.error(request, "⚠️ Error: La imagen es muy pesada. El máximo permitido es 3MB.")
                return redirect('dashboard')
            
            # Validar que sea un formato de imagen común
            extensiones_admitidas = ['jpg', 'jpeg', 'png', 'webp']
            if not imagen.name.lower().endswith(tuple(extensiones_admitidas)):
                messages.error(request, "⚠️ Error: Formato no válido. Usa JPG, PNG o WebP.")
                return redirect('dashboard')

        # Si pasa las validaciones, creamos el producto
        try:
            Producto.objects.create(
                nombre=nombre,
                descripcion=descripcion,
                precio=precio,
                stock=stock,
                categoria=categoria,
                imagen=imagen,
                disponible=int(stock) > 0
            )
            messages.success(request, f"✨ ¡El producto '{nombre}' ha sido publicado con éxito!")
        except Exception as e:
            messages.error(request, f"⚠️ Hubo un error al guardar: {e}")

    return redirect('dashboard')

@login_required
def actualizar_stock(request, producto_id):
    """
    Actualiza precio y stock de productos existentes y envía mensaje de éxito.
    """
    if request.method == 'POST':
        producto = get_object_or_404(Producto, id=producto_id)
        
        nuevo_stock = request.POST.get('stock')
        nuevo_precio = request.POST.get('precio')
        
        if nuevo_stock is not None:
            producto.stock = int(nuevo_stock)
            producto.disponible = producto.stock > 0
            
        if nuevo_precio is not None:
            producto.precio = int(nuevo_precio)
            
        producto.save()
        messages.success(request, f"✅ Datos de '{producto.nombre}' actualizados correctamente.")
        
    return redirect('dashboard')

@login_required
def eliminar_producto(request, producto_id):
    """
    Elimina un producto del inventario. Solo acepta POST para mayor seguridad.
    """
    if request.method == 'POST':
        producto = get_object_or_404(Producto, id=producto_id)
        nombre = producto.nombre

        # Si tiene imagen guardada, la eliminamos del servidor también
        if producto.imagen:
            if os.path.isfile(producto.imagen.path):
                os.remove(producto.imagen.path)

        producto.delete()
        messages.success(request, f"🗑️ El producto '{nombre}' ha sido eliminado correctamente.")
    
    return redirect('dashboard')

@login_required
def editar_producto(request, producto_id):
    """
    Edita todos los campos de un producto: nombre, descripción, categoría, precio, stock e imagen.
    """
    if request.method == 'POST':
        producto = get_object_or_404(Producto, id=producto_id)

        producto.nombre      = request.POST.get('nombre', producto.nombre)
        producto.descripcion = request.POST.get('descripcion', producto.descripcion)
        producto.categoria   = request.POST.get('categoria', producto.categoria)
        producto.precio      = int(request.POST.get('precio', producto.precio))
        producto.stock       = int(request.POST.get('stock', producto.stock))
        producto.disponible  = producto.stock > 0

        # Solo reemplaza la imagen si el usuario subió una nueva
        imagen_nueva = request.FILES.get('imagen')
        if imagen_nueva:
            if imagen_nueva.size > 3 * 1024 * 1024:
                messages.error(request, "⚠️ Error: La imagen es muy pesada. El máximo permitido es 3MB.")
                return redirect('dashboard')

            extensiones_admitidas = ['jpg', 'jpeg', 'png', 'webp']
            if not imagen_nueva.name.lower().endswith(tuple(extensiones_admitidas)):
                messages.error(request, "⚠️ Error: Formato no válido. Usa JPG, PNG o WebP.")
                return redirect('dashboard')

            # Eliminar la imagen anterior del servidor
            if producto.imagen and os.path.isfile(producto.imagen.path):
                os.remove(producto.imagen.path)

            producto.imagen = imagen_nueva

        producto.save()
        messages.success(request, f"✏️ El producto '{producto.nombre}' ha sido actualizado correctamente.")

    return redirect('dashboard')

# --- VISTAS PARA LA API (CONEXIÓN CON IONIC) ---
from rest_framework import viewsets
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    """
    Endpoint de la API que permite ver y editar productos desde la app móvil.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer