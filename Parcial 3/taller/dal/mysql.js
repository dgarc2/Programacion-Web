const db = require('../config/mysql');

exports.selectEventos = async () =>{
            let resultado = await  db.promise()
            .query('SELECT id, nombre, descripcion FROM eventos', (err,results)=>{
            return resultado[0];
        }
    )
    
}

exports.SelectEvento = async(id)=>{
    let [rows, fields] = await db.promise().query(
        'SELECT id, nombre, descripcion FORM eventos WHERE id = ?',
        [id]
    );
    return rows[0];
}

exports.insertarEvento = async (nombre, descripcion, fecha, lugar)=>{
    try{
        let result = await db.promise().execute(
            'INSERT INTO eventos (nombre,descripcion,fecha,lugar) VALUES(?,?,?,?)',
            [nombre, descripcion, fecha, lugar]
        );
        console.log(result);
        return result;
    }
    catch(err){
        console.error(err.message)
    }
}

exports.updateEvento = async (id, nombre,descripcion, fecha, lugar)=>{
    try{
        let result = await db.promise().execute()(
            'UPDATE FROM eventos SET nombre=?, descripcion=?, fecha=?, lugar=? WHERE id=?',
            [nombre, descripcion, fecha, lugar, id]
        )
        return result[0].affectedRows;
    }
    catch(err){
        console.error(err.message)
    }
}
exports.deleteEvento = async (id)=>{
    try{
        let result = await db.promise().execute()(
            'DELETE FROM eventos  WHERE id=?',
            [nombre, descripcion, fecha, lugar, id]
        )
        return result[0].affectedRows;
    }
    catch(err){
        console.error(err.message)
    }
}
