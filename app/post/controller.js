var posts = require('./posts');
var respostas = require('../utilidades/respostas');

var cadastrar = function(req, res){
    var post = req.body;
    post.dono = req.params.usuarioId;
    posts.cadastrar(post, respostas.criado(res), respostas.erro(res));
}

var atualizar = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    var post = req.body;
    post.id = postId;
    post.dono = usuarioId;

    posts.atualizar(post, respostas.ok(res), respostas.erro(res));
}

var buscarPorDonoEId = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    posts.buscarPorDonoEId(postId, usuarioId, respostas.ok(res), respostas.erro(res));
}

var buscarPorId = function(req, res){
    var postId = req.params.postId;
    posts.buscarPorId(postId, respostas.ok(res), respostas.erro(res));
}

var listarPorUsuario = function(req, res){
    var usuarioId = req.params.usuarioId;
    posts.listarPorUsuario(usuarioId, respostas.ok(res), respostas.erro(res));
}

var listarTodos = function(req, res){
    var titulo = req.query.titulo;
    var pagina = req.query.pagina || 1;
    var maximoItems = req.query.maximoItems || 5;

    if (titulo) {
        posts.listarPorTitulo(pagina, maximoItems, titulo, respostas.ok(res), respostas.erro(res));
    } else {
        posts.listarTodos(pagina, maximoItems, respostas.ok(res), respostas.erro(res));
    }
}

var adicionarComentario = function(req, res){
    var postId = req.params.postId;
    var comentario = req.body;

    if(comentario && comentario.email && comentario.conteudo){
        posts.adicionarComentario(postId, comentario, respostas.ok(res), respostas.erro(res));
    } else {
        respostas.erro(res)({mensagem:'Comentario inválido!'});
    }
}

exports.adicionarComentario = adicionarComentario;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.cadastrar = cadastrar;
exports.atualizar = atualizar;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
