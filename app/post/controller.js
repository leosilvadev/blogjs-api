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

var atualizar = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    var post = req.body;
    post.id = postId;
    post.dono = usuarioId;

    posts.atualizar(post, function(resultado){
        res.status(200).json(resultado);
    }, function(erro){
        res.status(400).json(erro);
    });
}

var buscarPorDonoEId = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    posts.buscarPorDonoEId(postId, usuarioId, function(resultado){
        res.status(200).json(resultado);

    }, function(erro){
        res.status(400).json(erro);

    });
}

var buscarPorId = function(req, res){
    var postId = req.params.postId;
    posts.buscarPorId(postId, function(resultado){
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
    var titulo = req.query.titulo;
    var pagina = req.query.pagina || 1;
    var maximoItems = req.query.maximoItems || 5;

    if (titulo) {
        posts.listarPorTitulo(pagina, maximoItems, titulo, function(resultado){
            res.status(200).json(resultado);

        }, function(erro){
            res.status(400).json(erro);

        });
    } else {
        posts.listarTodos(pagina, maximoItems, function(resultado){
            res.status(200).json(resultado);

        }, function(erro){
            res.status(400).json(erro);

        });
    }
}

var adicionarComentario = function(req, res){
    var postId = req.params.postId;
    var comentario = req.body;

    if(comentario && comentario.email && comentario.conteudo){
        posts.adicionarComentario(postId, comentario, function(post){
            res.status(200).json(post);
        }, function(erro){
            res.status(400).json(erro);
        });
    } else {
        res.status(400).json({mensagem:'Comentario inválido!'});
    }

}

exports.adicionarComentario = adicionarComentario;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.cadastrar = cadastrar;
exports.atualizar = atualizar;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
