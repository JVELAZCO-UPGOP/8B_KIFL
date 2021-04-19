const listaVeterinarias= document.getElementById('Lista-veterinarias');
const form= document.getElementById('form');
const pais= document.getElementById('pais');
const nombre= document.getElementById('nombre');
const apellido= document.getElementById('apellido');
const identificacion= document.getElementById('identificacion');
const btn_guardar= document.getElementById('btn_guardar');
const btn_cancelar= document.getElementById('btn_cancelar');
const indice=document.getElementById('indice');
const tituloModal= document.getElementById('exampleModalCenterTitle');
const btn_closeModal= document.getElementById('closeModal');
const btn_eliminar=document.getElementById('btn_eliminar');
const url = "https://veterinaria-backend-ashen.vercel.app/veterinarias";
let veterinarias=[];
async function listarVeterinarias()
{
  try {
    const respuesta = await fetch(url);
    const veterinariasDelServer = await respuesta.json();
    if(Array.isArray(veterinariasDelServer)){
      veterinarias= veterinariasDelServer;
    }
    if(veterinarias.length > 0){
      let htmlVeterinarias=veterinarias.map((veterinaria, index)=>` <tr>
      <th scope="row">${index}</th>
      <td>${veterinaria.identificacion}</td>
      <td>${veterinaria.pais}</td>
      <td>${veterinaria.nombre}</td>
      <td>${veterinaria.apellido}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info editar"><i class="fas fa-edit" data-toggle="modal" data-target="#exampleModalCenter"></i></button>
          <button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"  data-toggle="modal" data-target="#modalEliminar"></i></button>
        </div>
    </td>
    </tr>`).join("");
    listaVeterinarias.innerHTML=htmlVeterinarias;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
    return;
    }
    listaVeterinarias.innerHTML= `<tr>
    <td colspan="5" class="lista-vacia">No hay veterinarias</td>
  
  </tr>`;
  } catch (error) {
    console.log({error});
    $(".alert").show();
  }
 
}
async function enviarDatos(evento)
{
  evento.preventDefault();
  try {
    const datos=
 {
    nombre: nombre.value,
    apellido: apellido.value,
    pais: pais.value,
    identificacion: identificacion.value
 };
  const accion=btn_guardar.innerHTML;
  let urlEnvio = url;
  let method = "POST";
  if(accion === "Editar")
  {
      urlEnvio += `/${indice.value}`;
      method = "PUT";
      veterinarias[indice.value]=datos;
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
    listarVeterinarias();
    resetModal();
  }
  } catch (error) {
    console.log({error});
    $(".alert").show();
  }

}
function editar(index)
{
  return function cuandoDoyClick(){
  tituloModal.innerHTML='Editar Veterinari@'
  btn_guardar.innerHTML='Editar';
  $('#exampleModalCenter').modal('toggle')
  const veterinaria=veterinarias[index];
  nombre.value = veterinaria.nombre;
  apellido.value = veterinaria.apellido;
  pais.value = veterinaria.pais;
  identificacion.value = veterinaria.identificacion;
  indice.value=index;
  }
}
function resetModal()
{
  nombre.value = '';
  apellido.value = '';
  pais.value = 'Pais';
  identificacion.value = '';
  indice.value='';
  btn_guardar.innerHTML='Guardar'
  tituloModal.innerHTML='Agregar Veterinari@'
}
function eliminar(index)
{
  const urlEnvio = `${url}/${index}`;
  return async function clickEliminar()
  {
   try {
    $('#modalEliminar').modal('toggle')
    const respuesta = await fetch(urlEnvio, {
      method: "DELETE",
    });
    if(respuesta.ok){
      listarVeterinarias();
      resetModal();
    }
   } catch (error) {
    console.log({error});
    $(".alert").show();
   }
  };
}
listarVeterinarias();
form.onsubmit=enviarDatos;
btn_guardar.onclick=enviarDatos;
btn_cancelar.onclick= resetModal;
btn_closeModal.onclick=resetModal;

