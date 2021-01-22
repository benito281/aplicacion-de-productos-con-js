console.log("JAVASCRIPT ESTA CORRIENDO");
/* Agregamos una clase prodcuto y metodo constructor */
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;

    }

}

/* Creamos una clase UI->User Interface->Interfaz de usuario */
/* Apartir del elemento product-list lo que hacemos es crear un div 
atraves de javascript y lo insertaremos en index.html
*/
class UI {
    addProduct(product) {

        const productList = document.getElementById("product-list");
        const element = document.createElement("div");

        element.innerHTML = `
    <div class="card text-center mb-4">
        <div class="card-body">
            <strong>Nombre del producto </strong>:${product.name}
            <strong>Precio del producto</strong>:${product.price}
            <strong>Año del producto</strong>:${product.year}
            <button class="btn btn-danger" name="delete">Eliminar</button>
        </div>
    </div>
`; /*             <button class="btn btn-danger" name="delete">Eliminar</button>
*/
        productList.appendChild(element);
    }
    resetForm(){
        document.getElementById("product-form").reset();
    }
    deleteProduct(element) {
        if (element.name==='delete') {
            element.parentElement.parentElement.parentElement.remove();
            /* Seleccionamos la instancia show message */
            this.showMessage("Producto eliminado satifactoriamente","info");
        }
    }
    /* Creamos un div, definimos la clase que tendra y asignamos un elemento hijo para 
    crear el mensaje
    */
    showMessage(message,type) {
        const div= document.createElement("div");
        div.className= `alert alert-${type} mt-2`;
        div.appendChild(document.createTextNode(message))
        /* Mostrando en el DOM */
        /* Lo que hacemos es agregar un mensaje antes del contenedor */
       const container = document.querySelector(".container");
       const app = document.querySelector("#app");
       container.insertBefore(div,app)
       setTimeout(()=>{
           document.querySelector(".alert").remove();
       },2000 )
    }

}

/* Eventos del DOM */
/* AddEventListener captura un evento del formulario */
document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let year = document.getElementById("year").value;

    const product = new Product(name, price, year);

    const ui = new UI();
    /* Le agregamos return para que no continue la funcion de agregar mas mensajes en pantalla */
    /* NOTA: Sacale el return que esta antes de los showMessage y ve de que estoy hablando */
    if (name === "" || price === "" || year === "") {
       return ui.showMessage("Los campos no pueden estar vacios", "danger");
    }
    if (year<=1900 || year>=2021) {
      return ui.showMessage("El año ingresado no es valido","warning");
    }
    else{ 
    ui.addProduct(product);
    ui.resetForm();
    return ui.showMessage("Producto agregado satisfactoriamente", "success");
    }

});


/* Capturamos el evento de eliminar del product list */

document.getElementById("product-list").addEventListener("click", (e)=>{
   console.log("Se esta eliminando");
   const ui = new UI();
   ui.deleteProduct(e.target);
})