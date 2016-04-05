var Post = require('./modelo');

var listarTodos = function(quandoListar, quandoDerErro){
    Post.find()
        .exec(function(err, posts){
            if (err) {
                quandoDerErro(err);
            } else {
                quandoListar(posts);
            }
        });
}

var listarPorUsuario = function(usuarioId, quandoListar, quandoDerErro){
    Post.find({dono:usuarioId})
        .exec(function(err, posts){
            if (err) {
                quandoDerErro(err);
            } else {
                quandoListar(posts);
            }
        });
}

var cadastrar = function(post, quandoSalvar, quandoDerErro){
    new Post(post).save(function(err, resultado){
        if(err){
            quandoDerErro(err);
        } else {
            quandoSalvar(resultado);
        }
    });
}

var buscar = function(id, dono, quandoEncontrar, quandoDerErro){
    Post.findOne({_id:id, dono:dono})
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                quandoEncontrar(post);
            }
        });
}

exports.buscar = buscar;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
exports.cadastrar = cadastrar;
