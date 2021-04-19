module.exports ={
    mascotas: [
        {tipo: "Perro", nombre: "llo", dueno: "kevin"},
        {tipo: "Gato", nombre: "Tomo", dueno: "pedro"},
        ],
    veterinarias: [
        {identificacion: "922287399", pais: "Mexico", nombre: "kevin", apellido: "franco"},
        {identificacion: "9232387399", pais: "Mexico", nombre: "pedro", apellido: "lopez"},
      
    
        ],
    duenos: [
        {identificacion: "9872323232399", pais: "Mexico", nombre: "andy", apellido: "fernandez"},
        {identificacion: "8732325766", pais: "Colombia", nombre: "kevin", apellido: "franco"},
        ],  
    consultas: [
        {
            mascota: 0,
            veterinaria: 0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: "",
            diagnostico:  "diagnostico",
        },
    ],          
};
};