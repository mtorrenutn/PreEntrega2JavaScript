const carrito = [];

const comprar = () => {
    const MenorMayor = confirm("¿Desea ordenar los precios de menor a mayor?");

    if (MenorMayor) {
        oMenorMayor();
    } else {
        oMayorMenor();
    }
}
const oMenorMayor = () => {
    productos.sort((a,b)  => a.precio - b.precio);
    mostrarProductos();
}

const oMayorMenor = () => {
    productos.sort((a,b)  => b.precio - a.precio);
    mostrarProductos();
}


const mostrarProductos = () => {
    const listaProductos = productos.map(producto => {
        return "🍾"+producto.nombre+"$ARS"+producto.precio
    });

    alert("PRECIOS" +'\n\n'+listaProductos.join('\n'));
    comprarProductos(listaProductos)
}


const comprarProductos=(listaProductos) => 
{
let prodcton="";
let productoCantidad= 0;
let continuarComprando= false;


do {
  productoNombre = prompt("¿Que productos desea comprar?"+'\n\n'+listaProductos.join('\n'));
    productoCantidad = parseInt(prompt("¿Cuantos desea comprar?"));

    const busqueda = productos.some(producto => producto.nombre.toUpperCase() === productoNombre.toUpperCase());

    if (busqueda) {
        const producto = productos.find(producto => producto.nombre.toUpperCase() === productoNombre.toUpperCase());
        agregarPCarrito(producto, productoCantidad);
    } else {
        alert("No disponimos del producto que solicitaste, recorda escribir el producto tal cual figura en la lista.")
    }

    continuarComprando = confirm("Desea comprar otro producto");
} while (continuarComprando);

confirmarCompra();

// if(productocantidad>5){}
// const preciodesco=producto.precio *0.20//CONSTULTAR PARA HACER DESCUENTO BIEN.
// alert("su precio con descuento es =" +preciodesco)

}
//CHEQUEAMOS QUE ESTE EN EL CARRITO EL/LOS PRODUCTOS SELECCIONADOS
const agregarPCarrito = (producto, productoCantidad) => {
    const productoId = producto.id;
    
    const productoduplicado = carrito.find(producto => producto.id === productoId);
    if (!productoduplicado) {
        producto.cantidad += productoCantidad;
        carrito.push(producto);
    } else {
       
        productoduplicado.cantidad += productoCantidad;
    }
    console.log(carrito);
    console.log(productoduplicado);
}


const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return "--"+producto.nombre+"🍾|| U="+producto.cantidad;
    });

    const confirmarCompra = confirm("Carrito Bebidas Buenos Aires"
        +'\n\n'+listaCarrito.join('\n')
        +"Si desea eliminar productos del carrito seleccione CANCELAR"
    );

    if (confirmarCompra) {
        alert("Su compra fue exitosa")
    } else {
        const productoAEliminar = prompt("Ingrese el producto que desea eliminar");
        eliminarProductoCarrito(productoAEliminar);
    }
}

const eliminarProductoCarrito = (productoEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoEliminar) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra();
}

comprar();
