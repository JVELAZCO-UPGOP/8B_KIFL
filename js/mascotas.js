const listaMascotas= document.getElementById('Lista-mascotas');
const tipo= document.getElementById('tipo');
const nombre= document.getElementById('nombre');
const dueno= document.getElementById('dueno');
const form= document.getElementById('form');
const btn_guardar= document.getElementById('btn_guardar');
const btn_cancelar= document.getElementById('btn_cancelar');
const indice=document.getElementById('indice');
const tituloModal= document.getElementById('exampleModalCenterTitle');
const btn_closeModal= document.getElementById('closeModal');
const btn_eliminar=document.getElementById('btn_eliminar');
const url = "https://veterinaria-backend-ashen.vercel.app/mascotas";
let mascotas=[];
async function listarMascotas()
{
    try {
      const respuesta = await fetch(url);
      const mascotasDelServer = await respuesta.json();
      if(Array.isArray(mascotasDelServer)){
        mascotas= mascotasDelServer;
      }
      if(mascotas.length > 0){
        const htmlMascotas=mascotas
    .map((mascota, index)=> `<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="fas fa-edit" data-toggle="modal" data-target="#exampleModalCenter"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"  data-toggle="modal" data-target="#modalEliminar"></i></button>
      </div>
  </td>
  </tr>`).join("");
  listaMascotas.innerHTML=htmlMascotas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
  Array.from(document.getElementsByClassName('delete')).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
     return;
    }
     listaMascotas.innerHTML= `<tr>
          <td colspan="5" class="lista-vacia">No hay mascotas</td>
     
       </tr>`;
    }catch (error) {
      console.log({error})
      $(".alert").show();
    }
}
async function enviarDatos(evento)
{
  evento.preventDefault();
  try {
    const datos=
    {
     tipo: tipo.value,
     nombre: nombre.value,
     dueno: dueno.value
    };
    let method="POST";
    let urlEnvio = url;
    const accion=btn_guardar.innerHTML;
     if(accion === 'Editar'){
      method="PUT";
      mascotas[indice.value]=datos;
      urlEnvio = `${url}/${indice.value}`
       
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
       listarMascotas();
       resetModal();
     }
  } catch (error) {
    console.log({error})
    $(".alert").show();
  }
  
}
function editar(index)
{
  return function cuandoDoyClick(){
  tituloModal.innerHTML='Editar Mascota';
  btn_guardar.innerHTML='Editar';
  $('#exampleModalCenter').modal('toggle')
  const mascota=mascotas[index];
  nombre.value=mascota.nombre;
  dueno.value=mascota.dueno;
  tipo.value=mascota.tipo;
  indice.value=index;
  }
}
function resetModal()
{
  nombre.value='';
  dueno.value='Dueño';
  tipo.value='Tipo de animal';
  indice.value='';
  btn_guardar.innerHTML='Guardar'
  tituloModal.innerHTML='Nueva Mascota'
}
function eliminar(index)
{
  const urlEnvio = `${url}/${index}`;
  return async function clickEliminar()
  {
    try{
    $('#modalEliminar').modal('toggle')
    const respuesta = await fetch(urlEnvio, {
      method: "DELETE",
    });
    if(respuesta.ok){
      listarMascotas();
      resetModal();
    }
  }
  catch{
    console.log({error})
    $(".alert").show();
  }
    
  };
}
listarMascotas();


form.onsubmit=enviarDatos;
btn_guardar.onclick=enviarDatos;
btn_cancelar.onclick= resetModal;
btn_closeModal.onclick=resetModal;

