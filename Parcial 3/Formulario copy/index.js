// const express = require ('express')
// const path = require('path')
// const multer = require('multer')
// const cors = require('cors')
// const {jsPDF} = require('jspdf')

// const app = express()
// // console.log(__dirname)
// // console.log(__filename)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, path.join(__dirname+'/archivos/'))
//     },
//     filename: function (req,file,cb){
//         cb(null,file.fieldname+ '-'+ Date.now())
//     }
// })


// // const folder = path.join(__dirname+'/archivos/')
// const upload = multer({storage:storage})

// app.use(cors())
// app.use(express.json())
// app.use(express.text())
// app.use(upload.single('archivo'))
// // app.post('/formulario', upload.single('imagen'), (req,res)=>{
    
// // })
// app.post('/formulario', (req, res) => {
//     const { nom, apm, app } = req.body; 
//     const imagenPath = req.file.path;  

  
//     const doc = new jsPDF();
//     doc.text(`Nombre: ${nom}`, 10, 10);
//     doc.text(`Apellido Paterno: ${app}`, 10, 20);
//     doc.text(`Apellido Materno: ${apm}`, 10, 30);

    
//     const imageData = fs.readFileSync(imagenPath).toString('base64');
//     const imageType = req.file.mimetype.split('/')[1]; // Tipo de imagen (jpeg, png, etc.)
//     doc.addImage(`data:image/${imageType};base64,${imageData}`, 'JPEG', 10, 40, 50, 50);

    
//     const pdfPath = path.join(__dirname, '/archivos/', `documento-${Date.now()}.pdf`);
//     doc.save(pdfPath);

   
//     res.download(pdfPath, 'documento.pdf', (err) => {
//         if (err) {
//             console.error(err);
//         }
        
//         fs.unlinkSync(pdfPath);
//         fs.unlinkSync(imagenPath);
//     });
// })

// // app.post('/formulario', (req,res)=>{
// //     console.log(req.body)

// //     const doc = new jsPDF()
// //     doc.text(`Hello ${req.body.name}`,10,10)
// //     doc.save = (path.join(__dirname, file.fieldname+".pdf"))
// //     res.sendFile(__dirname)
// // })


// app.listen(8089,()=>{
//     console.log('servidor escuchando en el puerto 8089')
// })
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const PDFDoc = require('pdfkit');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
 
//const { jsPDF } = require("jspdf");
//const doc = new jsPDF();
 
const app = express();
 
// Middleware para habilitar CORS
app.use(cors());
 
const folder = path.join(__dirname+'/archivos/');
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
 
//const upload = multer( { dest:folder } );
const upload = multer( {storage: storage} );
 
app.use(upload.single('archivo'));
 
// Middlewares que parsean el cuerpo de la solicitud a JSON o texto, cuando se recibe json
app.use(express.json());
app.use(express.text());
 
app.use(express.urlencoded( { extended : true } ));
 
const validacion = [
    check('nombre').trim(),
    check('email').normalizeEmail(),
    check('ncontrol').trim(),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('email').isEmail().withMessage('El email es inválido'),
    check('ncontrol').notEmpty().withMessage('El número de control es obligatorio')
   
];
 
app.post('/formulario', validacion, async (req, res) => {
    try{
        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { nombre, apellido, email, ncontrol } = req.body;
        console.log(nombre);
        const imgPath = path.join(__dirname+"/archivos/logo.jpg");
        const docName = "datos-" + Date.now()+".pdf";
        console.log(docName);
       
   
        const doc = new PDFDoc({
            size: 'A4',
            margin: 40
        });
   
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=informacion_usuario.pdf');
   
        doc.fontSize(20).text('Datos', { align: 'center' });
   
        doc.moveDown();
        doc.fontSize(12);
        doc.text('Nombre: ' + nombre);
        doc.text(`Número de control: ${ncontrol}`);
        doc.text('Correo electronico: ' + email);
   
        if (imgPath) {
            if (fs.existsSync(imgPath)) {
                doc.moveDown();
                doc.image(imgPath, doc.page.width - 90 - 10, 10,{
                    width: 90,
                    height: 90
                });
            } else {
                doc.moveDown();
                doc.text('No se pudo cargar la imagen.');
            }
        } else {
            doc.moveDown();
            doc.text('No se subió ninguna imagen.');
        }
        var docPath = path.join(__dirname+'/archivosgen/' + docName);
        //doc.pipe(fs.createWriteStream(docPath));
        doc.end();
 
        const writeStream = fs.createWriteStream(docPath);
        doc.pipe(writeStream);
 
        writeStream.on('finish', () => {
            res.sendFile(docPath, (err) => {
                if (err) {
                    console.error("Error al enviar el archivo:", err);
                } else {
                    console.log("Archivo enviado correctamente.");
                }
            });
        });
 
    }catch(error){
        console.error("Error: "+error);
    }
})
 
app.listen(8088, () => {
    console.log('Servidor Express escuchando en el puerto 8088');
});
