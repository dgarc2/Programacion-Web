const db = require('../config/local');

exports.selectEventos = () =>{
    console.log(db.eventos);
    return db.eventos;
}

exports.selectEvento = (id) =>{
    const evento =  db.eventos.find(evento=>evento.id == id);
    return evento
}

exports.insertEvento = (nombre, descripcion, fecha, lugar)=>{
    const id = db.eventos[db.eventos.lenght-1].id+1;
    db.eventos.push({
        id,
        nombre,
        descripcion
    });
    return id
}

exports.updateEvento = (id, nombre, descripcion, fecha, lugar)=>{
    const evento = db.eventos.find(evento=>evento.id == id);
    evento.nombre = nombre;
    evento.descripcion = descripcion;
    evento.fecha=fecha;
    evento.lugar=lugar;
    return id;
}

exports.deleteEvento = (id) =>{
    const index = deb.eventos.findIndex(evento=> evento.id == id);
    if(index !== -1){
        db.eventos = db.eventos.splice(index, 1);
    }
    return id;
}