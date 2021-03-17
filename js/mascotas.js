const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaMascotas = document.getElementById('lista-mascotas');



let mascotas = [
    {
        tipo: "gato",
        nombre: "matute",
        dueno: "Kevin" 
    },
    {
        tipo: "perro",
        nombre: "Mex",
        dueno: "Pepe" 
    }
];

function listarMascotas() {
    const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
        </div>
    </td>
    </tr>`).join("");
        listaMascotas.innerHTML = htmlMascotas;
        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index))
}

function enviarDatos(evento) {
    evento.preventDefault();
        const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
    }; 
mascotas.push(datos);
listarMascotas();
}

function editar(index) {
    if(indice.value){
        btnGuardar.innerText='Editar'
    }
    return function cuandoCliqueo(){
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        dueno.value=mascota.dueno;
        tipo.value=mascota.tipo;
        indice.value=index;
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;