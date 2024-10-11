var express = require('express');
var router = express.Router();

/* GET HOME PAGE*/

router.get('/', function(req, res, next) {
  res.send('Hola soy la pagina de vision');
});

module.exports = router;