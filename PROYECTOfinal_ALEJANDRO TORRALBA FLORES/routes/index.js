var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var productosModel = require('../models/productosModel');
var cloudinary= require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {
 
  var productos = await productosModel.getProductos();

  productos= productos.splice(0,5);

  productos= productos.map(producto => {
   if(producto.img_id) {
     const imagen=cloudinary.url(producto.img_id, {
       width:460,
       crop: 'fill'
     });
     return{
       ...producto,
       imagen
     }
  } else {
   return{
     ...producto,
     imagen: '/imagenes/skate2.png'
   }
 }
 }); 
  res.render('index', {
    productos
  });
});
router.post('/', async(req, res, next)=>{
  var nombre = req.body.nombre;
  var correo = req.body.correo;
  var direccion = req.body.direccion;
  var telefono = req.body.telefono;
  var comentario = req.body.comentario;

  console.log(req.body)
  var obj={
    to: 'torralbaalejandro@hotmail.com',
    subject: 'Nueva solicitud de contacto',
    html:"<br> NOMBRE COMPLETO: " + nombre + "<br> CORREO: " + correo + "<br> DIRECCION: "
     + direccion + "<br> TELEFONO: " + telefono +"<br> COMENTARIO: " +comentario
  }
  // Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

var info = await transporter.sendMail(obj);
res.render('index',{
  message: 'Mensaje enviado correctamente',
});
}) ;// cierra la peticion del post

module.exports = router;
