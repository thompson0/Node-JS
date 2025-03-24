import { describe, expect, jest } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo editora', () => {
  const objetoEditora = {
    nome: 'Casa do codigo',
    cidade: 'Sao paulo',
    email: '123@gmail.com',
  };
  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });
  it.skip('Deve salvar editora no banco',()=>{
    const editora =  new Editora(objetoEditora)

    editora.salvar().then((dados)=>{
        expect(dados.nome).toBe('Casa do codigo')
    })
  })
  it.skip('Deve salvar no banco usando await', async()=>{
    const editora =  new Editora(objetoEditora)
    const dados = await editora.salvar()
    const valorRetornado = await Editora.pegarPeloId(dados.id)
    expect(valorRetornado).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            ...objetoEditora,
            created_at: expect.any(String),
            updated_at: expect.any(String),
        })
    )  
  })
  it('Deve fazer uma simulacao',()=>{
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
        id: 10,
        nome: 'Casa do codigo',
        cidade: 'Sao paulo',
        email: '123@gmail.com',
        created_at:"2024-10-1",
        updated_at:"2024-10-1"
    })
    const valorRetornado = editora.salvar()
    expect(valorRetornado).toEqual(
         expect.objectContaining({
             id: expect.any(Number),
             ...objetoEditora,
             created_at: expect.any(String),
             updated_at: expect.any(String),
         })
     )  
  })

  }
);
