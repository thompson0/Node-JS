import { somaHorasExtras , calculaDescontos } from "../index.js"; 

describe('testes dos calculos de folha', ()=>{
    it('deve retornar a soma das horas extras',()=>{
        const esperado = 2500;
        const retornado = somaHorasExtras(2000, 500)
    
        expect(retornado).toBe(esperado)
    });
    
    it('Deve descontar o valor do salario', ()=>{
     const esperado = 2300
     const retornado = calculaDescontos(2500,200)   
    
     expect(retornado).toBe(esperado)
    })
});
