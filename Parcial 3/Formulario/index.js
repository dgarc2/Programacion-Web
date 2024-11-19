const express = require ('express')
const path = require('path')
const app = express()
// console.log(__dirname)
// console.log(__filename)

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.post('/formulario', (req,res)=>{
    console.log(req.body)
    res.send(`Hola! ${req.body.nombre}`)
})

app.listen(8081,()=>{
    console.log('servidor escuchando en el puerto 8081')
})