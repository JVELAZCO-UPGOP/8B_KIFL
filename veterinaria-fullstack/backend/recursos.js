module.exports = {
    mascotas: [
        {tipo: "perro", nombre: "Trosky", dueno: "Camilo"},
        {tipo: "perro", nombre: "Trosky", dueno: "Camilo"},
        {tipo: "perro", nombre: "Trosky", dueno: "Camilo"},
        {tipo: "perro", nombre: "Trosky", dueno: "Camilo"},
        {tipo: "perro", nombre: "Trosky", dueno: "Camilo"},
    ],
    veterinarias: [
        {nombre: "kevin", apellido: "Lopez", documento: "64765745465746"},
        {nombre: "paola", apellido: "martinez", documento: "888885465746"},
        {nombre: "eduardo", apellido: "ramos", documento: "9765745465746"},
        {nombre: "fatima", apellido: "flores", documento: "611111765745465746"},
        {nombre: "luz", apellido: "mara", documento: "3765745465746"},        
    ],
    duenos: [
        {nombre: "polo", apellido: "torre", documento: "64765465746"},
        {nombre: "pablo", apellido: "luna", documento: "885465746"},
        {nombre: "isaac", apellido: "perez", documento: "9745465746"},
        {nombre: "mili", apellido: "soledad", documento: "765745465746"},
        {nombre: "melisa", apellido: "diaz", documento: "3745465746"},        
    ],
    consultas: [{
        mascota: 0,
        veteinaria: 0,
        fechaCreacion: new Date(), 
        fechaEdicion: new Date(), 
        historia: '',
        diagnostico: "",
        },
        
    ],
};