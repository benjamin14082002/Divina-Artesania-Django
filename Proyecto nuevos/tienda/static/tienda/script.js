document.addEventListener('DOMContentLoaded', () => {
    const contadorHTML = document.getElementById('cuenta-carrito');
    const modal = document.getElementById('modal-carrito');
    const btnCerrar = document.querySelector('.close-btn');
    const listaCarritoHTML = document.getElementById('lista-carrito');
    const precioTotalHTML = document.getElementById('precio-total');
    const carritoLink = document.querySelector('.carrito-link');
    const btnExplorar = document.getElementById('btn-explorar');
    const toastContainer = document.getElementById('toast-container');
    const contenedorProductos = document.getElementById('productos');
    const btnFinalizar = document.getElementById('btn-finalizar');

    let carrito = JSON.parse(localStorage.getItem('carrito_artesania')) || [];

    function lanzarToast(mensaje) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerText = mensaje;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    function actualizarResumen() {
        if (!listaCarritoHTML) return;
        listaCarritoHTML.innerHTML = '';
        let total = 0;

        carrito.forEach((item, index) => {
            total += item.precio;
            const div = document.createElement('div');
            div.classList.add('item-carrito');
            div.innerHTML = `
                <span>* ${item.nombre} - $${item.precio.toLocaleString('es-CL')}</span>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            listaCarritoHTML.appendChild(div);
        });

        precioTotalHTML.innerText = total.toLocaleString('es-CL');
        contadorHTML.innerText = carrito.length;
        localStorage.setItem('carrito_artesania', JSON.stringify(carrito));
    }

    if (contenedorProductos) {
        contenedorProductos.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-comprar')) {
                const card = e.target.closest('.card');
                const nombre = card.querySelector('h3').innerText;
                const precio = parseInt(card.querySelector('.precio').innerText.replace(/[^0-9]/g, ''));

                carrito.push({ nombre, precio });
                actualizarResumen();
                lanzarToast(`✅ ${nombre} añadido`);
            }
        });
    }

    if (listaCarritoHTML) {
        listaCarritoHTML.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-eliminar')) {
                const index = e.target.getAttribute('data-index');
                const nombre = carrito[index].nombre;
                carrito.splice(index, 1);
                actualizarResumen();
                lanzarToast(`❌ ${nombre} eliminado`);
            }
        });
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            if (carrito.length === 0) return lanzarToast("⚠️ Carrito vacío");
            const miNumero = "56933042260";
            let mensaje = "¡Hola! Quiero comprar:\n\n";
            let total = 0;
            carrito.forEach((item, i) => {
                mensaje += `${i + 1}. *${item.nombre}* - $${item.precio.toLocaleString('es-CL')}\n`;
                total += item.precio;
            });
            mensaje += `\n*Total: $${total.toLocaleString('es-CL')}*`;
            window.open(`https://api.whatsapp.com/send?phone=${miNumero}&text=${encodeURIComponent(mensaje)}`, '_blank');
        });
    }

    if (btnExplorar) btnExplorar.addEventListener('click', () => contenedorProductos.scrollIntoView({ behavior: 'smooth' }));
    if (carritoLink) carritoLink.addEventListener('click', (e) => { e.preventDefault(); modal.style.display = 'block'; });
    if (btnCerrar) btnCerrar.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target == modal) modal.style.display = 'none'; });

    actualizarResumen();
});