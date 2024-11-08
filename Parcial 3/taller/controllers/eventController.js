const db = require('../config/mysql');
const { selectEventos,  SelectEvento, insertarEvento,
    updateEvento , deleteEvento 
} = require('../dal/mysql');
let eventos = [
    {
        id: 1,
        nombre: 'Cri cri',
        descripcion: 'grillito cri cri'
    },
    {
        id: 2,
        nombre: 'lapizito',
        descripcion: 'payasito'
    },
    {
        id: 3,
        nombre:'tigres del norte',
        descripcion: 'banda'
    }
];

exports.getEvento = async (req, res)=>{
    const {id} = req.params;
    try{
        // const evento = eventos.find(evento => evento.id == id);
        // if(!evento){
        //     return res.status(404).json('el evento buscado no existe');
        //     // res.status(200).json(eventos[id - 1]);
        // }
        // res.status(200).json();
        const evento = await SelectEvento(id);
        if(!evento){
            res.status(404).json('el evento no existe');
        }
        else{
            res.status(200).json(evento);
        }

    }
    catch(error){
        res.status(500).json(error.message);
    }

};

exports.getEventos =  async (req, res)=>{
    const eventos = await selectEventos();
    res.status(200).json(selectEventos());
    // db.query('SELECT * FROM eventos', (err,results)=>{
    //     if(err) return res.status(500).json(err);
    //     res.status(200).json(results);
    // })
    // res.status(200).json(eventos);
};
exports.editEvento = async (req,res)=>{
    const {id} = req.params;
    const {nombre, descripcion, fecha, lugar} = req.body;
    // const evento = eventos.find(evento=> evento.id == id);
    // evento.nombre=nombre;
    // evento.descripcion=descripcion;
    const filasAfectadas = await updateEvento(id, nombre, descripcion, fecha, lugar);
    if(!editId){
        res.status(404).json('no existe el id');
    }
    else{
        console.info(eventos);

        res.status(200).json('se modificaron este numero de filas: '+ filasAfectadas);
    }
    // eventos[id].nombre=nombre;
    // eventos[id].descripcion=descripcion;


};

exports.createEvento = async (req,res)=>{
    const {nombre, descripcion, fecha, lugar}= req.body;
    
    // const id = eventos.length+1;
    // const evento = {
    //     id,
    //     nombre,
    //     descripcion
        
    // };
    // eventos.push(evento);
    // console.info(evento);
    if(!nombre){
        res.status(400).json('el nombre no es valido');
        return;
    }
    if(!descripcion){
        res.status(400).json('la descripcion no es valida');
        return;
    }
    const id = await insertarEvento(nombre, descripcion, fecha, lugar );

    res.status(200).json('se creo el evento '+nombre+' con el id: '+id);
};

exports.deleteEvento = async (req, res) =>{
    const {id}=req.params;
    try{
        
        // const nombre = eventos.find(evento=>evento.id==id).nombre;
    
        // eventos = eventos.filter(evento=> evento.id != id);
        
        // console.info(eventos);
        const deleteid = await deleteEvento(id);
        if(filasAfectadas==1){
            res.status(200).json('Se elimino el evento '+id);
        }
        else{
            res.status(404).json('No se afecto ninguna fila');
        }
    
        
    }
    catch{

    }
}
