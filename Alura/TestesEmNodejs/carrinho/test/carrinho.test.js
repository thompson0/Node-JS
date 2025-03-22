import { it } from "node:test";
import Carrinho from "../carrinho";
import Item from "../item";

describe('Testes no carrinho',()=>{
    it('Deve inicializar vazio',()=>{
        const carrinho = new Carrinho
        expect(carrinho.subtotal).toBeNull()
    })
    it('Deve ter itens',()=>{
        const itens = new Item('Banana', 2 , 5)
        const itens2 = new Item('maca', 5 ,2)
        const carrinho = new Carrinho()
        carrinho.adiciona(itens)
        carrinho.adiciona(itens2)

        expect(typeof carrinho).toBe('object')
        expect(carrinho.itens[0]).toBe(itens)
        expect(carrinho.itens[1]).toBe(itens2)

        expect(carrinho.itens).toContain(itens)
        expect(carrinho.itens).toContain(itens2)
    })
    it('Deve ter a propiedade total na inicializao',()=>{
        const carrinho = new Carrinho

        expect(carrinho).toHaveProperty('total')
    });

    it('Carrinho precisa ter um item',()=>{      
        function englobaErroCarrinho(params) {
            const carrinho = new Carrinho
            carrinho.finalizaCompra()    
        }
        expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio ')
    });
    it('Deve adicionar um frete',()=>{
        const carrinho = new Carrinho
        carrinho.adicionaFrete(10)
        expect(carrinho.frete).toBe(10)
    })

    it('Deve finalizar as comprar',()=>{
        const item = new Item('Banana',2,5)
        const item2 = new Item('Mel',1,5)
        const carrinho =  new Carrinho
        carrinho.adiciona(item,item2)
        carrinho.adicionaFrete(10)

        expect(carrinho.finalizaCompra().toStrictEqual({
            subtotal :15,
            frete: 10
        }))
    })
    it('Deve ter o preco calculado',()=>{
        const carrinho = new Carrinho
        const item = new Item
        item.pegaValorTotalItem(5,10)
        carrinho.adicionaFrete(10)
        carrinho.calculaTotal(carrinho.adicionaFrete + item.pegaValorTotalItem)

        expect(carrinho.calculaTotal).toThrowError()
    })
    
})