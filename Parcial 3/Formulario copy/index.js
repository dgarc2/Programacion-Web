const express = require ('express')
const path = require('path')
const multer = require('multer')
const cors = require('cors')
const {jspdf, default: jsPDF} = require('jspdf')

const app = express()
// console.log(__dirname)
// console.log(__filename)
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname+'/archivos/'))
    },
    filename: function (req,file,cb){
        cb(null,file.fieldname+ '-'+ Date.now())
    }
})


// const folder = path.join(__dirname+'/archivos/')
const upload = multer({dest:folder})

app.use(cors())
app.use(express.json())
app.use(express.text())
app.use(upload.single('archivo'))

app.post('/formulario', (req,res)=>{
    console.log(req.body)

    const doc = new jsPDF()
    doc.text(`Hello ${req.body.name}`,10,10)
    doc.save = (path.join(__dirname, file.fieldname+".pdf"))
    res.sendFile(__dirname)
})

app.listen(8081,()=>{
    console.log('servidor escuchando en el puerto 8081')
})

