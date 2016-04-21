var Post = require('./modelo');
var respostas = require('../utilidades/respostas');

var listarTodos = function(pagina, maximoItems, quandoListar, quandoDerErro){
    Post.paginate({}, {page: pagina, limit: maximoItems}, respostas.tratar(quandoListar, quandoDerErro));
}

var listarPorUsuario = function(usuarioId, quandoListar, quandoDerErro){
    Post.find({dono:usuarioId})
        .exec(respostas.tratar(quandoListar, quandoDerErro));
}

var cadastrar = function(post, quandoSalvar, quandoDerErro){
    new Post(post).save(respostas.tratar(quandoSalvar, quandoDerErro));
}

var atualizarDadosPost = function(post, novoPost, quandoDerErro, quandoAtualizar){
    post.titulo = novoPost.titulo;
    post.conteudo = novoPost.conteudo;
    post.save(function(erro, resultado){
        if(erro){
            quandoDerErro(erro);
        } else {
            quandoAtualizar(post);
        }
    });
}

var atualizar = function(novoPost, quandoAtualizar, quandoDerErro){
    Post.findOne({_id:novoPost.id, dono:novoPost.dono})
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                atualizarDadosPost(post, novoPost, quandoDerErro, quandoAtualizar);
            }
        });
}

var buscarPorDonoEId = function(id, dono, quandoEncontrar, quandoDerErro){
    Post.findOne({_id:id, dono:dono})
        .exec(respostas.tratar(quandoEncontrar, quandoDerErro));
}

var buscarPorId = function(id, quandoEncontrar, quandoDerErro){
    Post.findById(id)
        .exec(respostas.tratar(quandoEncontrar, quandoDerErro));
}

var listarPorTitulo = function(pagina, maximoItems, titulo, quandoListar, quandoDerErro){
    var query = {titulo:new RegExp(titulo, "i")};
    var paginacao = {page: pagina, limit: maximoItems};
    Post.paginate(query, paginacao, respostas.tratar(quandoListar, quandoDerErro));
}

var setarNovoComentario = function(post, comentario, quandoAdicionar, quandoDerErro){
    post.comentarios.push({usuario:comentario.email, conteudo:comentario.conteudo});
    post.save(function(erro){
        if(erro){
            quandoDerErro(erro);
        } else {
            quandoAdicionar(post);
        }
    });
}

var adicionarComentario = function(postId, comentario, quandoAdicionar, quandoDerErro){
    Post.findById(postId)
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                setarNovoComentario(post, comentario, quandoAdicionar, quandoDerErro);
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
