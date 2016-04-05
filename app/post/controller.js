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

var buscarPorDonoEId = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    posts.buscarPorDonoEId(postId, usuarioId, function(resultado){
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

exports.buscarPorDonoEId = buscarPorDonoEId;
exports.cadastrar = cadastrar;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
