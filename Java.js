let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* AGREGAR PRODUCTO */
function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* MOSTRAR EN TABLA */
function mostrarCarrito() {
    const body = document.getElementById("carrito-body");
    const totalSpan = document.getElementById("total");

    if (!body) return;

    body.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        body.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="cambiarCantidad(${index}, -1)">➖</button>
                ${producto.cantidad}
                <button onclick="cambiarCantidad(${index}, 1)">➕</button>
            </td>
            <td>$${subtotal}</td>
            <td><button onclick="eliminarProducto(${index})">❌</button></td>
        </tr>
        `;
    });

    totalSpan.textContent = total;
}

/* CAMBIAR CANTIDAD */
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

/* ELIMINAR */
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

/* VACIAR */
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

/* CARGAR */
document.addEventListener("DOMContentLoaded", mostrarCarrito);



// MOSTRAR FORMULARIO

function mostrarFormulario(){
    document.getElementById("formularioCompra").style.display = "block";
}

// REALIZAR COMPRA

function realizarCompra(event){
    event.preventDefault();

    alert("Gracias por su compra");

    document.getElementById("formularioCompra").style.display = "none";
}