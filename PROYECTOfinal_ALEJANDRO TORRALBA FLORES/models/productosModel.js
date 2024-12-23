var pool = require('./bd');
async function getProductos() {
    var query= 'select * from productos';
    var rows = await pool.query(query);
    return rows;
}

async function deleteProductosById(id){
    var query= 'delete from productos where id = ?';
    var rows = await pool.query(query,[id]);
    return rows;
}

async function insertProductos(obj){
    try {
        var query= "INSERT INTO productos SET ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    } catch (error) {
        console.log(error)
        throw error;
    }   //cierre cath
}

//traigo los datos para modificar una sola novedad
async function getProductoById(id){
    var query= "select *from productos where id = ?";
    var rows = await pool.query(query,[id]);
    return rows[0];
}

async function modificarProductoById(obj,id){
    try{
        var query = "update productos set ? where id=?";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    }catch(error){
        throw error;
    }
} //cierre del modificar

async function buscarProductos(busqueda){
    var query= "select *from productos where titulo like ? OR cuerpo like ?";
    var rows = await pool.query(query,['%'+busqueda+'%','%'+busqueda+'%','%'+busqueda+'%']);
    return rows;
}

module.exports = {getProductos, deleteProductosById, insertProductos,getProductoById,modificarProductoById,buscarProductos}