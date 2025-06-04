window.onload = () => {
  renderizarProdutos();
};

function renderizarProdutos() {
  const container = document.querySelector(".novidades .row");
  if (!container) return;

  container.innerHTML = "";

  produtos.forEach((produto) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";

    col.innerHTML = `
      <div class="produto-container position-relative">
        <a href="${produto.link}">
          <img src="${produto.imagem}" class="img-fluid rounded" alt="${produto.nome}">
        </a>
        <div class="heart position-absolute top-0 end-0 me-2 mt-2 fs-5 text-secondary">🤍</div>
      </div>
      <p class="mt-2 fs-6">${produto.nome}</p>
      <strong class="fs-6">R$ ${produto.preco.toFixed(2)}</strong>
    `;

    container.appendChild(col);
  });
}

function abrirCarrinho() {
  const modal = new bootstrap.Modal(document.getElementById('modal-carrinho'));
  modal.show();
}

function fecharCarrinho() {
  document.getElementById('modal-carrinho').classList.add('d-none');
}

function buscarEndereco() {
  const cep = document.getElementById("cep").value.replace(/\D/g, '');
  if (cep.length === 8) {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        const data = response.data;
        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("estado").value = data.uf;
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch(error => {
        alert("Erro ao buscar o endereço.");
        console.error(error);
      });
  }
}