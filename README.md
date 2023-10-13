# Explique cada una de las funciones definidas por el usuario en el código JavaScript presentado en el paso 2. 

Este código es parte de una operación que genera tarjetas de productos en una página web a partir de un catálogo de productos almacenado en un array llamado catalogo. El código itera a través de cada elemento en el array catalogo, y para cada producto, crea una seccion para cada uno de los productos. su imagen, título, precio, campo de entrada para la cantidad y un botón para agregar al carrito. 
Tambien se establece un evento de clic en el botón "Agregar al Carrito" de cada tarjeta. Cuando un usuario hace clic en este botón, se recopila la cantidad ingresada por el usuario en el campo de entrada y se llama a la función agregarProductoAlCarrito con el producto correspondiente y la cantidad. Si la cantidad es mayor que cero, el producto se agrega al carrito de compra.

```javascript
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
```

Esta funcion se encarga de gestionar la adición de productos al carrito de compra en una aplicación o sitio web. Toma dos parámetros: producto y cantidad. Primero, verifica si el producto ya está presente en el carrito de compra utilizando el método find para buscar un elemento en el array carrito que coincida con el ID del producto. Si el producto ya existe en el carrito, se actualiza la cantidad de ese producto en el carrito agregando la nueva cantidad proporcionada. Si el producto no se encuentra en el carrito, se crea un nuevo objeto que contiene el producto y la cantidad y se agrega al array carrito.


```javascript

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
```

Actualiza el resumen de compra de la siguiente manera: 
En primer lugar, se borra cualquier contenido previamente mostrado en el elemento con la ID "resumenCompra" para evitar duplicados. Luego, la función itera a través del array carrito, que contiene los productos seleccionados y sus cantidades. Para cada producto en el carrito, se crea una fila en una tabla, donde se muestran los detalles del producto, como su ID, descripción, cantidad, precio unitario y subtotal multiplicando la cantidad por el precio unitario. Estas filas se agregan al elemento con la ID "resumenCompra", lo que refleja visualmente los productos en el carrito y su resumen de compra. AL final hace una suma de subtotales para dar el total actual.

```javascript
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
```



Este bloque de código se encarga de gestionar la finalización de la compra. Cuando un usuario hace clic en el botón "Finalizar Compra," se ejecuta una función que primero guarda los datos del carrito de compra en el almacenamiento local del navegador, utilizando el método localStorage. Esto asegura que la información del carrito esté disponible incluso si el usuario cierra la página o el navegador y regresa más tarde.

Luego, el código abre un nuevo ticket de compra en una nueva ventana o pestaña del navegador mediante la función window.open. 

```javascript
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
```


# Catálogo de Productos

Este proyecto contiene un catálogo de productos implementado en JavaScript.

## El Arreglo de Catálogo

El catálogo se define como un arreglo que almacena información sobre los productos. Cada producto es representado como un objeto con las siguientes propiedades: "id," "descripcion," "imagen," y "precio." A continuación, se muestra cómo se declara el arreglo "catalogo":

```javascript
const catalogo = [
    { id: 1, descripcion: "Producto 1", imagen: "producto1.jpg", precio: 40 },
    { id: 2, descripcion: "Producto 2", imagen: "producto2.jpg", precio: 50 },
    { id: 3, descripcion: "Producto 3", imagen: "producto3.jpg", precio: 55 },
    { id: 4, descripcion: "Producto 4", imagen: "producto4.jpg", precio: 30 },
    { id: 5, descripcion: "Producto 5", imagen: "producto5.jpg", precio: 45 },
    { id: 6, descripcion: "Producto 6", imagen: "producto6.jpg", precio: 55 },
    // Agrega más productos aquí
];
```
## Manipulando el Catálogo
El catálogo se puede manipular de diversas maneras en JavaScript. Aquí se muestran algunas operaciones comunes:

- **Acceder a un elemento específico:**
```javascript
const primerProducto = catalogo[0];
```

- **Recorrer el arreglo:**
  Puedes utilizar bucles, como un bucle "for," para realizar operaciones en cada producto:
```javascript
  for (let i = 0; i < catalogo.length; i++) {
    const producto = catalogo[i];
    // Realiza operaciones con "producto"
}
```

- **Filtrar elementos:**
Utiliza el método filter para filtrar elementos basados en ciertas condiciones:
```javascript
  const productosCaros = catalogo.filter(producto => producto.precio > 50);
```

- **Agregar elementos:**
Agrega nuevos productos al arreglo usando el método push:
```javascript
  const nuevoProducto = { id: 7, descripcion: "Nuevo Producto", imagen: "producto7.jpg", precio: 60 };
catalogo.push(nuevoProducto);
```

- **Modificar elementos:**
```javascript
catalogo[0].descripcion = "Nuevo Nombre";

```

- **Eliminar elementos:**
```javascript
  // Elimina el primer producto
catalogo.splice(0, 1);
```

# ¿Que hace const card = document.createElement("div") ?

La línea const card = document.createElement("div") en JavaScript se utiliza para crear un nuevo elemento HTML de tipo div.

En este caso, se está creando un elemento div que se almacenará en la variable card. Luego, este elemento puede ser personalizado y agregado al DOM (el documento HTML) para mostrar contenido en la página web.

# ¿Que hace card.innerHTML?

La propiedad card.innerHTML se utiliza para obtener o establecer el contenido HTML de un elemento DOM en JavaScript. En el contexto que proporcionaste, card es una variable que almacena un elemento div que se utiliza para representar una tarjeta de producto en una página web.

Si se usa card.innerHTML para establecer contenido HTML, puedes proporcionar una cadena de texto que represente el contenido HTML, ejemplo:
```javascript
card.innerHTML = `
    <div class="card">
        <img src="imagen.jpg" alt="Descripción de la imagen">
        <h2>Título</h2>
        <p>Contenido</p>
    </div>
`;
```

También puedes usar card.innerHTML para leer el contenido HTML actual del elemento. Por ejemplo, si deseas obtener el contenido HTML actual de la tarjeta:
```javascript
const contenidoHTML = card.innerHTML;
```

# ¿Que hace catalogoContainer.appendChild(card) ?

La línea catalogoContainer.appendChild(card) agrega el elemento card como un hijo del elemento con la variable catalogoContainer. En otras palabras, esta línea de código inserta la tarjeta representada por el elemento card en el DOM como un elemento secundario del elemento referenciado por catalogoContainer.

Cuando se ejecuta catalogoContainer.appendChild(card), la tarjeta creada en el elemento card se coloca como un elemento secundario dentro del elemento catalogoContainer. Esto tiene como resultado que la tarjeta se muestre en la página web dentro del contenedor catalogoContainer. Cada vez que este código se ejecuta en un bucle o proceso de generación dinámica, se agregará una nueva tarjeta al catálogo dentro de catalogoContainer.
