const url = require('url');
const StringDecoder=require('string_decoder').StringDecoder;
const enrutador= require("./enrutador");
module.exports = (req, res) => {
    //Obtener la url desde el objeto request
    const urlActual=req.url;
    const urlParseada= url.parse(urlActual, true);
    
    //Obtener la ruta
    const ruta= urlParseada.pathname;

    //Quitar Slash
    const rutaLimpia= ruta.replace(/^\/+|\/+$/g, '');
    
    //Obtener metodo http
    const metodo= req.method.toLowerCase();
    
    //dar permisos de CORS escribiendo los headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader(
      "Access-Control-Request-Methods", 
      "OPTIONS, GET, PUT, DELETE, POST"
      );
    res.setHeader(
      "Access-Control-Allow-Methods", 
      "OPTIONS, GET, PUT, DELETE, POST"
      );

    //Dar respuesta inmediata cuando el metodo sea options

    if(metodo === "options"){
      res.writeHead(204);
      res.end();
      return;
    }

    //Obtener variables del query url
    const {query}=urlParseada;
    
    //Obtener los headers
    const {headers}=req;
    
    //Obtener payload si es que existe uno
    const decoder = new StringDecoder('utf-8');
    let buffer = "";

    //3.4.1 Ir acumulando la data cuando el request resiva
    //un payload
    req.on('data', (data)=>{
      buffer += decoder.write(data);
    });

    //3.4.2Terminar de acumular datos y finalizar el decoder
      req.on('end', ()=>{
      buffer += decoder.end();
     if(headers["content-type"]==="application/json"){
       buffer = JSON.parse(buffer);
     }

     //3.4.3 Revisar si tiene subruras
    
     if(rutaLimpia.indexOf("/")>-1){
      var [rutaPrincipal, indice] = rutaLimpia.split('/');
    }

    //3.5 ordenar la data del request
    const data = {
      indice,
      ruta: rutaPrincipal || rutaLimpia,
      query,
      metodo,
      headers,
      payload: buffer,
    };

    
    console.log({data});

    //3.6 Elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene
    let handler;
    if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
      handler = enrutador[data.ruta][metodo];
    }
    else {
      handler = enrutador.noEncontrado;
    }

    //Ejecutar handler (manejador) para enviar la respuesta
   if(typeof handler === 'function') {
      handler(data, (statusCode = 200, mensaje)=>{
      const respuesta = JSON.stringify(mensaje);
      res.setHeader("Content-Type", "application/json")
      res.writeHead(statusCode);
      //Responder a la aplicacion cliente
      res.end(respuesta);
      })
     }
   });
 };