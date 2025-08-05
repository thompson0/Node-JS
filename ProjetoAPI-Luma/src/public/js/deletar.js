const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const codigo = form.codigo.value;

  try {
    const resposta = await fetch(`/pecas/${codigo}`, {
      method: 'DELETE'
    });

    const resultado = await resposta.json();
    alert(resultado.message || "Peça deletada!");
    form.reset();
  } catch (err) {
    alert("Erro ao deletar peça");
    console.error(err);
  }
});
