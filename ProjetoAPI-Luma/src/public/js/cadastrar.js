const form = document.getElementById('formCadastro');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const dados = {
        nome: form.nome.value,
        criadora: form.criadora.value,
        codigo: form.codigo.value,
        descricao: form.descricao.value
      };

      try {
        const resposta = await fetch('/pecas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();
        alert(resultado.message || "Peça cadastrada!");
        form.reset();
      } catch (err) {
        alert("Erro ao cadastrar peça");
        console.error(err);
      }
    });