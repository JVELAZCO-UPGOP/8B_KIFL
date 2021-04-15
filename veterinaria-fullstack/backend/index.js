const http = require("http");
const requestHandler = require("./request-handler");
const server = http.createServer(requestHandler);

server.listen(4000, ()=>{
    console.log("el servidor esta escuchando peticiones en http://localhost:4000/");
});