class tareaNueva {
      constructor(titulo, descripcion) {
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.estado = "incompleta";
      }
}

const render = (titulo, descripcion) => {
      let li = document.createElement("li");
      li.innerHTML = `
      <a href="" id = "${titulo.replace(/ /g, "-")}">
            <h2>${titulo}</h2>
            <p>${descripcion}</p>
      </a>
      `
      ul.appendChild(li);
};

const renderTotal = () => {
      let tareasStorage = JSON.parse(localStorage.getItem("tareasStorage"));
      if (tareasStorage) {
            for (let i of tareasStorage) {
                  render(i.titulo, i.descripcion);
            }
      } else {
            tareasStorage = [];
            localStorage.setItem("tareasStorage", JSON.stringify(tareasStorage));
      }
};


const subirStorage = (objeto) => {
      let tareasStorage = JSON.parse(localStorage.getItem("tareasStorage"));
      tareasStorage.push(objeto);
      localStorage.setItem("tareasStorage", JSON.stringify(tareasStorage));
};

const crearTarea = (evento) => {
      evento.preventDefault();
      let formData = new FormData(formulario);
      let titulo = formData.get("titulo");
      let descripcion = formData.get("descripcion");
      let objetoTarea = new tareaNueva(titulo, descripcion); //crea el objeto tarea
      //AGREGAR AL LOCAL STORAGE (objetoTarea)
      subirStorage(objetoTarea);
      // FUNCION RENDER
      render(titulo, descripcion);
      Toastify({
            text: "Acabas de Agregar una Tarea Nueva!!",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                  background: "#27C696",
            }
      }).showToast();
      formulario.reset();
};


let ul = document.getElementById("visor");

let formulario = document.querySelector("form");

formulario.addEventListener("submit", crearTarea);

renderTotal();

