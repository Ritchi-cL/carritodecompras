/*
    Variables
    # para "id" . para "class"
*/

// Seleccionamos los elementos del HTML
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// Cargamos la función de manera global
cargarRegistrarEventListeners();

/*
    Funciones
*/

// Función que espera un click y llama a otra función "agregarCurso"
function cargarRegistrarEventListeners() {
    // Cuando agregas un curso, presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        // Reseteamos el carrito por un arreglo vacío
        articulosCarrito = [];

        // Eliminamos todo de la vista HTML
        limpiarHTML();
    } );

}

// Función para agregar el curso
function agregarCurso(event) {

    // Prevenimos por default que al hacer click vaya al "href='#'"
    event.preventDefault();

    // Si la clase contiene o es "agregar-carrito"
    if (event.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = event.target.parentElement.parentElement;
        // console.log("Agregaste al carrito un curso");
        leerDatosCurso(cursoSeleccionado);
        
    }

}

function eliminarCurso(event) {

    if (event.target.classList.contains("borrar-curso")) {
        const cursoId = event.target.getAttribute("data-id");

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

// Función para leer el contenido HTML al que le dimos click, y extrae la info
// La función va a tomar en su variable curso, lo que se llene por variable cursoSeleccionado
function leerDatosCurso(curso) {

    // crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        // Seleccionamos de la clase "precio" el "span"
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,

    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    // Verifica con un boolean si existe
    // console.log(existe);

    if (existe) {

        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( (curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                // Retorna el objeto actualizado
                return curso;
            }

            else {
                // Retorna los objetos que no son los duplicados
                return curso;
            }
        } );

        articulosCarrito = [...cursos];
    }

    else {
        /*
        Agrega elementos al arreglo del carrito
        El carrito va a ser igual a la copia de lo que tenga carrito anteriormente con el objeto infoCurso
        */
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
        // Usando destructuring para extraer los atributos del objeto curso (de la variable infoCurso)
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
       
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a hreh="#" class="borrar-curso" data-id="${id}"> X </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    } );
    
}

// Elimina los cursos del tbody

function limpiarHTML() {
    /*
        Forma lenta
        contenedorCarrito.innerHTML = "";
    */
    
    // Forma más rapida, mientras exista un hijo, los va eliminando
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}