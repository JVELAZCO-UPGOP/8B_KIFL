const listaDuenos= document.getElementById('Lista-duenos');
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
const url = "https://veterinaria-backend-ashen.vercel.app/duenos";
let duenos=[];
async function listarDuenos()
{
    try {
      const respuesta = await fetch(url);
      const duenosDelServer = await respuesta.json();
      if(Array.isArray(duenosDelServer)){
        duenos= duenosDelServer;
      }
      if(duenos.length > 0){
        let htmlDuenos=duenos.map((duenos, index)=>` <tr>
    <th scope="row">${index}</th>
    <td>${duenos.identificacion}</td>
    <td>${duenos.pais}</td>
    <td>${duenos.nombre}</td>
    <td>${duenos.apellido}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="fas fa-edit" data-toggle="modal" data-target="#exampleModalCenter"></i></button>
        <button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"  data-toggle="modal" data-target="#modalEliminar"></i></button>
      </div>
  </td>
  </tr>`).join("");
  listaDuenos.innerHTML=htmlDuenos;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
      return;
      }
      listaDuenos.innerHTML= `<tr>
    <td colspan="5" class="lista-vacia">No hay dueños</td>
  
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
      duenos[indice.value]=datos;
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
    listarDuenos();
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
  tituloModal.innerHTML='Editar Dueños'
  btn_guardar.innerHTML='Editar';
  $('#exampleModalCenter').modal('toggle')
  const dueno=duenos[index];
  nombre.value = dueno.nombre;
  apellido.value = dueno.apellido;
  pais.value = dueno.pais;
  identificacion.value = dueno.identificacion;
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
  tituloModal.innerHTML='Nuevo Dueño'
}
function eliminar(index)
{
  return async function clickEliminar()
  {
    const urlEnvio = `${url}/${index}`;
    try {
      $('#modalEliminar').modal('toggle')
      const respuesta = await fetch(urlEnvio, {
        method: "DELETE",
      });
      if(respuesta.ok){
        listarDuenos();
        resetModal();
      }
    } catch (error) {
      console.log({error});
      $(".alert").show();
    }
  };
}
listarDuenos();
form.onsubmit=enviarDatos;
btn_guardar.onclick=enviarDatos;
btn_cancelar.onclick= resetModal;
btn_closeModal.onclick=resetModal;
