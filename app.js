class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false;
    }

    toggleCompleta() {
        this.completa = !this.completa;
    }
}

class GestorDeTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    }

    agregarTarea(nombre) {
        const nuevaTarea = new Tarea(nombre);
        this.tareas.push(nuevaTarea);
        this.guardarTareas();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.guardarTareas();
    }

    editarTarea(index, nuevoNombre) {
        this.tareas[index].nombre = nuevoNombre;
        this.guardarTareas();
    }

    toggleTarea(index) {
        this.tareas[index].toggleCompleta();
        this.guardarTareas();
    }

    guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        renderTareas();
    }
}

const gestor = new GestorDeTareas();
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.getElementById('addTask').addEventListener('click', () => {
    const nombreTarea = taskInput.value.trim();
    if (nombreTarea) {
gestor.agregarTarea(nombreTarea);
        taskInput.value = '';
    }
});

function renderTareas() {
    taskList.innerHTML = '';
    gestor.tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completada', tarea.completa);

        const nombreSpan = document.createElement('span');
        nombreSpan.textContent = tarea.nombre;

        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle';
        toggleButton.textContent = tarea.completa ? 'Pendiente' : 'Completada';
        toggleButton.addEventListener('click', () => {
            gestor.toggleTarea(index);
        });

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editarTarea(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => eliminarTarea(index));

        li.appendChild(nombreSpan);
        li.appendChild(toggleButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function eliminarTarea(index) {
    gestor.eliminarTarea(index);
}

function editarTarea(index) {
    const nuevoNombre = prompt('Editar tarea:', gestor.tareas[index].nombre);
    if (nuevoNombre) {
        gestor.editarTarea(index, nuevoNombre);
    }
}

renderTareas();