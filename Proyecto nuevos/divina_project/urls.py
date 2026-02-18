from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# 1. Importamos el router y la vista de la API
from rest_framework import routers
from tienda.views import ProductoViewSet

# 2. Configuramos el enrutador de la API
router = routers.DefaultRouter()
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tienda.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    
    # 3. Nueva ruta para que Ionic consuma los datos
    path('api/', include(router.urls)),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)