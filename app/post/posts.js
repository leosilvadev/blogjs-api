var Post = require('./modelo');

var listarTodos = function(pagina, maximoItems, quandoListar, quandoDerErro){
    Post.paginate({}, {page: pagina, limit: maximoItems}, function(err, posts){
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

var buscarPorDonoEId = function(id, dono, quandoEncontrar, quandoDerErro){
    Post.findOne({_id:id, dono:dono})
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                quandoEncontrar(post);
            }
        });
}

var listarPorTitulo = function(pagina, maximoItems, titulo, quandoListar, quandoDerErro){
    Post.paginate({titulo:new RegExp(titulo, "i")}, {page: pagina, limit: maximoItems}, function(err, posts){
            if(err){
                quandoDerErro(err);
            } else {
                quandoListar(posts);
            }
        });
}

exports.buscarPorDonoEId = buscarPorDonoEId;
exports.listarPorTitulo = listarPorTitulo;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
exports.cadastrar = cadastrar;
