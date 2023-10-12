document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: 1, descripcion: "Producto 1", imagen: "producto1.jpg", precio: 40 },
        { id: 2, descripcion: "Producto 2", imagen: "producto2.jpg", precio: 50 },
        { id: 3, descripcion: "Producto 3", imagen: "producto3.jpg", precio: 55 },
        { id: 4, descripcion: "Producto 4", imagen: "producto4.jpg", precio: 30 },
        { id: 5, descripcion: "Producto 5", imagen: "producto5.jpg", precio: 45 },
        { id: 6, descripcion: "Producto 6", imagen: "producto6.jpg", precio: 55 },
        // Agrega más productos aquí
    ];

    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");

    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.descripcion}">
                <div class="card-body">
                    <h5 class="card-title">${producto.descripcion}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    Cantidad: 
                    <input type="number" id="cantidadProducto${producto.id}" value="0" min="0">
                    <button class="btn btn-primary" id="agregarAlCarrito${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón de "Agregar al Carrito"
        const botonAgregar = card.querySelector(`#agregarAlCarrito${producto.id}`);
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });

    const carrito = [];

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.producto.id}</td>
                <td>${item.producto.descripcion}</td>
                <td>${item.cantidad}</td>
                <td>$${item.producto.precio}</td>
                <td>$${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }

        // Agrega un evento al botón "Finalizar Compra"
        const finalizarCompraBtn = document.getElementById("finalizarCompra");
        finalizarCompraBtn.addEventListener("click", function () {
            guardarDatosEnLocalStorage();
            // Abre el ticket en una nueva ventana o pestaña
            const ticketURL = "ticket.html";
            window.open(ticketURL, "_blank");
        });

        function guardarDatosEnLocalStorage() {
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }


});
