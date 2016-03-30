var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://leonardo:q1w2e3@ds025379.mlab.com:25379/blogjs');

app.use(bodyParser.json());
app.use(cors());

var usuarioController = require('./usuario/controller');

app.get('/v1/usuarios', usuarioController.listar);
app.get('/v1/usuarios/:id', usuarioController.buscar);
app.post('/v1/usuarios', usuarioController.cadastrar);
app.post('/v1/usuarios/auth', usuarioController.autenticar);

app.listen(9000, function(){
  console.log('BlogJS API no ar...');
});
