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

var atualizar = function(novoPost, quandoAtualizar, quandoDerErro){
    Post.findOne({_id:novoPost.id, dono:novoPost.dono})
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                post.titulo = novoPost.titulo;
                post.conteudo = novoPost.conteudo;
                post.save(function(erro, resultado){
                    if(err){
                        quandoDerErro(err);
                    } else {
                        quandoAtualizar(post);
                    }
                });
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

var buscarPorId = function(id, quandoEncontrar, quandoDerErro){
    Post.findById(id)
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

var adicionarComentario = function(postId, comentario, quandoAdicionar, quandoDerErro){
    Post.findById(postId)
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                post.comentarios.push({usuario:comentario.email, conteudo:comentario.conteudo});
                post.save(function(erro){
                    if(erro){
                        quandoDerErro(erro);
                    } else {
                        quandoAdicionar(post);
                    }
                });

            }
        });
}

exports.adicionarComentario = adicionarComentario;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.listarPorTitulo = listarPorTitulo;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
exports.cadastrar = cadastrar;
exports.atualizar = atualizar;
