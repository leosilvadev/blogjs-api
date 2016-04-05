var posts = require('./posts');

var cadastrar = function(req, res){
    var post = req.body;
    post.dono = req.params.usuarioId;
    posts.cadastrar(post, function(resultado){
        res.status(201).json(resultado);

    }, function(erro){
        res.status(400).json(erro);

    });
}

var buscar = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    posts.buscar(postId, usuarioId, function(resultado){
        res.status(200).json(resultado);

    }, function(erro){
        res.status(400).json(erro);

    });
}

var listarPorUsuario = function(req, res){
    var usuarioId = req.params.usuarioId;
    posts.listarPorUsuario(usuarioId, function(resultado){
        res.status(200).json(resultado);

    }, function(erro){
        res.status(400).json(erro);

    });
}

var listarTodos = function(req, res){
    posts.listarTodos(function(resultado){
        res.status(200).json(resultado);

    }, function(erro){
        res.status(400).json(erro);

    });
}

exports.buscar = buscar;
exports.cadastrar = cadastrar;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
