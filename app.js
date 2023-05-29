// Definir el catálogo con sus categorías y artículos

// Declaramos el ARRAY que contendra el catalogo, con categorias y con valores: Nombre, Precio, Cantidad.
const catalogo = {
    collares: [
      { nombre: "💜 Maxi collar BOHO con cuentas", precio: 80, cantidad: 10 },
      { nombre: "🖤🤍 Duo de collares Ying yang ", precio: 35, cantidad: 5 },
      { nombre: "✨ Doble layer Margarita y lucero", precio: 40, cantidad: 8 }
    ],
    aretes: [
      { nombre: "💕 Aretes REINA MALVADA de BLANCANIEVES", precio: 100, cantidad: 15 },
      { nombre: "💕 Aretes ÚRSULA", precio: 100, cantidad: 12 },
      { nombre: "💕 Aretes asimétricos FLORES DE PERLAS", precio: 70, cantidad: 7 }
    ],
    pulseras: [
      { nombre: "💜 Pulsera FANTASY inspo Pandora", precio: 85, cantidad: 20 },
      { nombre: "💜 Trío de pulseras de balines MAMÁ", precio: 40, cantidad: 6 },
      { nombre: "💜 Pulsera HELLO KITTY", precio: 30, cantidad: 10 }
    ],
    diademas: [
      { nombre: "💜 Reloj cuarzo UNICORNIO LUMINOSO", precio: 120, cantidad: 3 },
      { nombre: "💜 Reloj inspo CASIO PASTEL", precio: 85, cantidad: 5 },
      { nombre: "💜 Reloj cuarzo COLORS", precio: 90, cantidad: 2 }
    ]
  };
  
  // Mensaje de bienvenida sobre el uso de la aplicación. 
  alert(`
        Coquelicot complements
        Hola Rosalía
        v1.2`
        );
  
  // Empezaremos a solicitar datos para empezar a generar la nota de los clientes - 
  const nombreCliente = prompt("¿De quién realizaremos el pedido?");
  const pedidoCliente = { nombre: nombreCliente, articulos: [] };
  
  let nuevoArticulo = true;
  
  while (nuevoArticulo) {
    // Mostrar el catálogo y obtener la categoría seleccionada por el usuario
    let categoriaSeleccionada = "";
    let categoriaValida = false;
  
    while (!categoriaValida) {
      categoriaSeleccionada = prompt(
        `Ingresa un valor para ver el contenido:
        1. Collares
        2. Aretes
        3. Pulseras
        4. Diademas`
      );
  
      if (categoriaSeleccionada >= "1" && categoriaSeleccionada <= "4") {
        categoriaValida = true;
      } else {
        alert("Valor inválido. Por favor, ingresa un valor válido.");
      }
    }
  
    let articuloSeleccionado = null;
  
    // Una vez que el usuario seleccione categoria de los articulos realizaremos CASOS
    switch (categoriaSeleccionada) {
      case "1":
        articuloSeleccionado = seleccionarArticulo(catalogo.collares);
        break;
      case "2":
        articuloSeleccionado = seleccionarArticulo(catalogo.aretes);
        break;
      case "3":
        articuloSeleccionado = seleccionarArticulo(catalogo.pulseras);
        break;
      case "4":
        articuloSeleccionado = seleccionarArticulo(catalogo.diademas);
        break;
    }
  
    // Cual es la cantidad que ingresaremos al carrritp
    let cantidadSeleccionada = 0;
    let cantidadValida = false;
  
    while (!cantidadValida) {
      const cantidadIngresada = prompt("Ingresa la cantidad deseada:");
  
      if (!isNaN(cantidadIngresada) && cantidadIngresada > 0) {
        cantidadSeleccionada = parseInt(cantidadIngresada);
        cantidadValida = true;
      } else {
        alert("Valor inválido. Por favor, ingresa un valor válido.");
      }
    }
  
    // Validamos que la cantidad ingresada en el carrito sea valida
    if (cantidadSeleccionada > articuloSeleccionado.cantidad) {
      alert("No hay suficiente stock. Por favor, elige una cantidad menor.");
      continue;
    }
  
    // Ageramos valores al carrito
    pedidoCliente.articulos.push({
      nombre: articuloSeleccionado.nombre,
      precio: articuloSeleccionado.precio,
      cantidad: cantidadSeleccionada
    });
  
    // Actualizar la cantidad de artículos en el catálogo
    articuloSeleccionado.cantidad -= cantidadSeleccionada;
  
    // Preguntamos si terminamos la nota o no 
    const agregarNuevoArticulo = prompt(`¿Deseas agregar otro artículo? 
    1. Si
    2. No`).toLowerCase();
  
    // Validacion de la respuesta
    if (agregarNuevoArticulo === "2") {
      nuevoArticulo = false;
    } else if (agregarNuevoArticulo !== "1") {
      alert("Opción inválida. Por favor, intenta de nuevo.");
      continue;
    }
  }
  
  // Calculamos el total de pedido, realizando una formula 
  let totalPedido = 0;
  
  for (const articulo of pedidoCliente.articulos) {
    totalPedido += articulo.precio * articulo.cantidad;
  }
  
  // Mostrar el resumen del pedido
  alert(
    `Resumen del pedido:\n\nCliente: ${pedidoCliente.nombre}\n\nArtículos:\n` +
    obtenerResumenArticulos(pedidoCliente.articulos) +
    `\nTotal: $${totalPedido.toFixed(2)}`
  );
  
  // Función para seleccionar un artículo del catálogo
  function seleccionarArticulo(categoria) {
    let mensaje = "Elige un artículo:\n";
  
    for (let i = 0; i < categoria.length; i++) {
      const articulo = categoria[i];
      mensaje += `${i + 1}. ${articulo.nombre} - $${articulo.precio}\n`;
    }
  
    const seleccion = parseInt(prompt(mensaje)) - 1;
    return categoria[seleccion];
  }
  
  // Función para obtener el resumen de los artículos en el pedido
  function obtenerResumenArticulos(articulos) {
    let resumen = "";
  
    for (const articulo of articulos) {
      resumen += `${articulo.nombre} - $${articulo.precio} x ${articulo.cantidad}\n`;
    }
  
    return resumen;
  }
  