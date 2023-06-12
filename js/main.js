class tareaNueva {
      constructor(titulo, descripcion) {
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.estado = "incompleta";
      }
}

const eliminarTodo = (params) => {
      //content
};


const alerta = (texto, color) => {
      if (color === "rojo"){
            color = "#BF0603";
      } else {
            color = "#27C696";
      }
      Toastify({
            text: texto,
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                  background: `${color}`,
            }
      }).showToast();
};

const tacharPostit = (li, titulo) => { //el parametro es el id del list item STR
      let tareasStorage = JSON.parse(localStorage.getItem("tareasStorage")); //agarra el localStorage
      let objetoTarea = tareasStorage.find((el) => el.titulo === titulo);
      let postItATachar = document.getElementById(li);
      switch (objetoTarea.estado) {
            case "incompleta":
                  objetoTarea.estado = "completa";
                  postItATachar.classList.replace("incompleta", "completa");
                  break;
            case "completa":
                  objetoTarea.estado = "incompleta"
                  postItATachar.classList.replace("completa", "incompleta");
                  break;
      }
      localStorage.setItem("tareasStorage", JSON.stringify(tareasStorage));
};

const render = (titulo, descripcion, estado) => {
      let li = document.createElement("li");
      li.id = `${titulo.replace(/ /g, "-")}`;
      li.classList.add(`${estado}`);
      li.innerHTML = `
      <div>
            <h3>${titulo}</h3>
            <p>${descripcion}</p>
      </div>
      `
      ul.appendChild(li);
      li.addEventListener("click", () => tacharPostit(li.id, titulo))
};

const eliminarCompletas = () => {
      let tareasStorage = JSON.parse(localStorage.getItem("tareasStorage"));
      let Tachadas = tareasStorage.filter((el) => el.estado === "completa"); //objeto con tareas tachadas
      let noTachadas =   tareasStorage.filter((el) => el.estado === "incompleta");
      if (tareasStorage.length === 0 || Tachadas.length === 0){
            alerta("No Hay Tareas Para Eliminar","rojo")
      }  else {
            for (let i of Tachadas){
                  let titulosId = i.titulo.replace(/ /g, "-");
                  let li = document.getElementById(`${titulosId}`);
                  li.remove();
            }
            localStorage.setItem("tareasStorage", JSON.stringify(noTachadas));
      }
};

const renderTotal = () => {
      let tareasStorage = JSON.parse(localStorage.getItem("tareasStorage"));
      if (tareasStorage) {
            for (let i of tareasStorage) {
                  render(i.titulo, i.descripcion, i.estado);
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
      if (titulo === ""){
            alerta("aviso: Tiene que Agregar un Titulo a la Tarea", "rojo");
      } else {
            let objetoTarea = new tareaNueva(titulo, descripcion); //crea el objeto tarea
            //AGREGAR AL LOCAL STORAGE (objetoTarea)
            subirStorage(objetoTarea);
            // FUNCION RENDER
            render(titulo, descripcion, "incompleta");
            alerta("Acabas de Agregar una Tarea Nueva!!", "verde");
            formulario.reset();
      }
};

let formulario = document.querySelector("form");

let ul = document.getElementById("visor");
let completas = document.getElementById("completas");
let todo = document.getElementById("todo");

formulario.addEventListener("submit", crearTarea);
completas.addEventListener("click", eliminarCompletas);
todo.addEventListener("click", eliminarTodo);

renderTotal();

