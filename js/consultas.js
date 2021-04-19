const listaConsultas = document.getElementById("Lista-consultas");
const mascota = document.getElementById("mascota");
const veterinaria = document.getElementById("veterinaria");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice= document.getElementById("indice");
const tituloModal= document.getElementById("exampleModalCenterTitle");
const btn_guardar= document.getElementById("btn_guardar");
const btn_cancelar = document.getElementById("btn_cancelar");
const formulario = document.getElementById("form");
let consultas =[];
let mascotas = [];
let veterinarias = [];

const url = "https://veterinaria-backend-ashen.vercel.app";

async function listarConsultas(){
    const entidad = "consultas"
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const consultasDelServer = await respuesta.json();
        if(Array.isArray(consultasDelServer)){
            consultas = consultasDelServer;
        }
        if(respuesta.ok){
            const htmlConsultas = consultas
            .map(
                (consulta, indice) => 
            `<tr>
                <th scope="row">${indice}</th>
                <td>${consulta.mascota.nombre}</td>
                <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
                <td>${consulta.diagnostico}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                </div>
                </td>
            </tr>`
            ).join("");
            listaConsultas.innerHTML = htmlConsultas;
            Array.from(document.getElementsByClassName("editar")).forEach(
            (botonEditar, index) => (botonEditar.onclick=editar(index)));
  
        };
    } catch (error) {
         console.log({error});
    $(".alert-danger").show();
    }
}


async function listarMascotas(){
    const entidad = "mascotas"
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }
        if(respuesta.ok){
            const htmlMascotas = mascotas
            .map(
                (mascota, indice) => 
            `<option value="${indice}">${mascota.nombre}</option>`
            ).join("");
            mascota.innerHTML += htmlMascotas;
        };
    } catch (error) {
         console.log({error});
        $(".alert-danger").show();
    }
}



async function listarVeterinarias(){
    const entidad = "veterinarias"
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const veterinariasDelServer = await respuesta.json();
        if(Array.isArray(veterinariasDelServer)){
            veterinarias = veterinariasDelServer;
        }
        if(respuesta.ok){
            const htmlVeterinarias = veterinarias
            .map(
                (veterinaria, indice) => 
            `<option value="${indice}">${veterinaria.nombre} ${veterinaria.apellido}</option>`
            ).join("");
            veterinaria.innerHTML += htmlVeterinarias;
        };
    } catch (error) {
         console.log({error});
        $(".alert-danger").show();
    }
}

function editar(index)
{
  return function cuandoDoyClick(){
  tituloModal.innerHTML='Editar Dueños'
  btn_guardar.innerHTML='Editar';
  $('#exampleModalCenter').modal('toggle')
  const consulta=consultas[index];
  indice.value=index;
  mascota.value = consulta.mascota.id;
  veterinaria.value = consulta.veterinaria.id;
  historia.value = consulta.historia;
  diagnostico.value = consulta.diagnostico;
  }
}

async function enviarDatos(evento)
{
    const entidad = "consultas";
  evento.preventDefault();
  try {
    const datos=
 {
   mascota: mascota.value,
   veterinaria: veterinaria.value,
   historia: historia.value,
   diagnostico: diagnostico.value,
   
 };
  if(validar(datos) === true){
    const accion=btn_guardar.innerHTML;
    let urlEnvio = `${url}/${entidad}`;
    let method = "POST";
    if(accion === "Editar")
    {
        urlEnvio += `/${indice.value}`;
        method = "PUT";     
    }
    const respuesta = await fetch(urlEnvio, {
      method,
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if(respuesta.ok){
      listarConsultas();
      resetModal();
      }
      formulario.classList.add('was-validated');
      return;   
    }
    $(".alert-warning").show();
    
  } catch (error) {
    console.log({error});
    $(".alert-danger").show();
  }
 
}

function resetModal()
{
    btn_guardar.innerHTML='Guardar';
[indice, mascota, veterinaria, historia, diagnostico].forEach((inputActual)=>{
    inputActual.value = "";
    inputActual.classList.remove("is-invalid");
    inputActual.classList.remove("is-valid");
});
    $(".alert-warning").hide();
    tituloModal.innerHTML='Nueva Consulta';
    $("#exampleModalCenter").modal("toggle");
}
function validar(datos){
    if(typeof datos !== 'object') return false;
    let respuesta = true;
    for(let llave in datos){
        if(datos[llave].length === 0){
            document.getElementById(llave).classList.add("is-invalid");
            respuesta = false;
        } 
        else{
            document.getElementById(llave).classList.remove("is-invalid");
            document.getElementById(llave).classList.add("is-valid");
        }
    }
    if(respuesta === true) $(".alert-warning").hide();
    return respuesta;
}

btn_guardar.onclick = enviarDatos;
btn_cancelar.onclick = resetModal;
listarVeterinarias();
listarConsultas();
listarMascotas();