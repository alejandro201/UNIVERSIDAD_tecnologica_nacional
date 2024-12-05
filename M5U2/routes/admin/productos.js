var express = require('express');
var router = express.Router();

var productosModel = require('../../models/productosModel');

router.get('/',async function(req, res, next) {

    var productos = await productosModel.getProductos();

    res.render('admin/productos', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        productos
    });
});

router.get('/eliminar/:id', async (req, res, next) =>{
    var id = req.params.id;
    await productosModel.deleteProductosById(id);
    res.redirect('/admin/productos')
});

/*mostar formulario de agregar -agregar.hbs*/

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {  //agregar.hbs
        layout: 'admin/layout'
    })
});


/*insertar los datos en la tabla de productos */
router.post('/agregar', async(req,res,next)=>{
    try{
        if(req.body.titulo !="" && req.body.cuerpo !=""){
            await productosModel.insertProductos(req.body);

            res.redirect('/admin/productos')
        }else{
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'todos los campos son rqueridos'
            })
        }
    }catch(error){
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el producto'
        })
    }
})

router.get('/modificar/:id', async(req,res,next) => {
    var id = req.params.id;
    
    var producto = await productosModel.getProductoById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        producto
    });
});  //cierre get modificar



router.post('/modificar', async(req,res,next) => {
    try{
        var obj= {
            titulo: req.body.titulo,
            cuerpo: req.body.cuerpo
        }

        console.log(req.body) //para ver si trae los datos

        await productosModel.modificarProductoById(obj, req.body.id);
        res.redirect('/admin/productos');

    }catch(error){
        console.log(error) //para ver si trae los datos
        res.render('admin/modificar',{
          layout: 'admin/layout',
          error: true,
          message: "No se modifico la novedad"  
        })
    }
}); //cierro el post

module.exports = router;