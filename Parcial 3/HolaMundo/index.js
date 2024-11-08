const express = require('express')

const app = express()

app.get('/', (req,res)=>{
        res.send('hello world')
})

app.listen(8082,()=>{
    console.log('servidor escuchando en el puerto 8081')
})