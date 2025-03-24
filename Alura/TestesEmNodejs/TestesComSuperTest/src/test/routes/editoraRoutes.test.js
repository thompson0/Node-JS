import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import  request  from 'supertest';
import app from '../../app.js'

let server;
beforeEach( ()=>{
    const port = 3001

    server = app.listen(port)

});

afterEach( ()=>{

    server.close();
});

describe('GET em /editoras',()=>{
    it('Deve retornar uma list de editoras', async()=>{
       const resposta = await request(app)
        .get('/editoras')
        .set('Accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200)

        expect(resposta.body[0].email).toEqual('1@1.com')
    });
});

    let idResposta;
    describe('Post em /editoras',()=>{
    it('Deve adiconar nova editora', async()=>{
       const resposta = await request(app)
        .post('/editoras')
        .send({
            nome:'1',
            cidade: 'Sp',
            email:'1@1.com'
        })
        .expect(201)
        idResposta = resposta.body.content.id;
    })
    it('Deve nao adicionar nada no body vazio', async ()=>{
        await request(app)
        .post('/editoras')
        .send({})
        .expect(400)
    });
});

describe('Get em /editora/:id',()=>{
    it('Deve retornar a editora pelo id',async()=>{
        await request(app)
        .get(`/editoras/${idResposta}`)
        .expect(200)
    });
});

describe('Put em /editoras/:id',()=>{
    it.each([
        ["nome", {nome: 'CVC'}],
        ["cidade", {cidade: 'SAO PEDRO'}],
        ["email",  {email: 'CVC@CVC.COM'}],
    ])
    (`Deve alterar o campo %s no id selecionado`,async(chave ,params)=>{
       const requisicao = { request }; 
        const spy = jest.spyOn(requisicao, 'request')
        await requisicao.request(app)
        .put(`/editoras/${idResposta}`)
        .send(params)
        .expect(204)
        
    expect(spy).toHaveBeenCalled;
    })
})
describe('Delete em /editora:id',()=>{
    it('Deve deletar o recurso adicionado',async()=>{
        await request(app)
        .delete(`/editoras/${idResposta}`)
        .expect(200)
    });
});
