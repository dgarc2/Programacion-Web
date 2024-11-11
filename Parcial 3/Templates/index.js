const express = require ('express')
const path = require('path')
const app = express()
console.log(__dirname)
console.log(__filename)


app.use(express.json())
app.use(express.text())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.get('/administrativos', (req,res)=>{
    console.log(req.query)
    res.send('servidor contestando a peticion')
    res.render('admin')
})

app.get('/maestros',(req,res)=>{
    console.log(req.body)
    res.send('servidor contestando a peticion')
})

app.get('/estudiantes/:carrera', (req,res)=>{
    console.log(req.params.carrera)
    console.log(req.query.control)
    res.send('servidor contestando a peticion')
})

app.listen(8081,()=>{
    console.log('servidor escuchando en el puerto 8080')
})