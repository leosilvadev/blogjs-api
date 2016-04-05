var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://leonardo:q1w2e3@ds025379.mlab.com:25379/blogjs');

app.use(bodyParser.json());
app.use(cors());

var usuarioController = require('./usuario/controller');
var postController = require('./post/controller');

app.get('/v1/usuarios', usuarioController.listar);
app.get('/v1/usuarios/:id', usuarioController.buscar);
app.post('/v1/usuarios', usuarioController.cadastrar);
app.post('/v1/usuarios/auth', usuarioController.autenticar);

app.get('/v1/posts', postController.listarTodos);
app.get('/v1/usuarios/:usuarioId/posts', postController.listarPorUsuario);
app.get('/v1/usuarios/:usuarioId/posts/:postId', postController.buscarPorDonoEId);
app.post('/v1/usuarios/:usuarioId/posts', postController.cadastrar);

app.listen(9000, function(){
  console.log('BlogJS API no ar...');
});
