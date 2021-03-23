const http = require('http');
const url = require('url');


const callbackDelServidor = (req, res) => {
    // 1. obtener la URL desde el objeto request //Ok
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);
    const StringDecoder = require('string_decoder').StringDecoder;

    // 2. obtener una ruta
    const ruta = urlParseada.pathname;

    //3. quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
    
    //3.1 obtener el metodo http
    const metodo = req.method.toLowerCase();

    //3.2 obtener las variables del query url
    const {query = {} } = urlParseada; 

    //3.3 obtener headers
    const {headers = {} } = req; 

    //3.4 obtener payload, en el caso de haber uno
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    
    //3.4.1 ir acomulando la data cuando el request reciba un payload
    req.on('data', (data)=>{
        buffer += decoder.data(); 
    });

    //3.4.2 terminar de acomular datos y decirle al decoder que finalice
    req.on('end', ()=>{
        buffer += decoder.end(); 

    // 3.5 ordenar la data del request
    const data = {
        ruta: rutaLimpia,
        query,
        metodo,
        headers,
        payload: buffer
    };

    //3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene
    let handler;
    if(rutaLimpia && enrutador[rutaLimpia]) {
        handler = enrutador[rutaLimpia];
    }else{
        handler = enrutador.noEncontrado;
    }

    // 4. ejecutar handler (manejador) para enviar la respuesta
    if(typeof handler === 'function'){
        handler(data, (statusCode = 200, mensaje)=>{
            const respuesta = JSON.stringify(mensaje);
            res.writeHead(statusCode);
            // linea donde realmente ya estamos respondiendo a la applicacion cliente
            res.end(respuesta);

        })
    }
    
    });
};

const enrutador = {
    ruta: (data, callback) => { 
        callback(200, {mensaje: 'esta es /ruta'});
    },
    usuarios: (data, callback) => { 
        callback(200, [{nombre: 'usuario 1'},{nombre: 'usuario 2'}]);
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}

const server = http.createServer(callbackDelServidor);

server.listen(4000, ()=>{
    console.log("el servidor esta escuchando peticiones en http://localhost:4000/");
});