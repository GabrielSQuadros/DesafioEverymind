async function carregarProdutos() {
    const response = await fetch('/produtos');
    const produtos = await response.json();
    const produtosDiv = document.getElementById('produtos');
    produtosDiv.innerHTML = '';
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('a');
        produtoDiv.href = '#';
        produtoDiv.className = 'list-group-item list-group-item-action';
        produtoDiv.innerHTML = `
            <h5 class="mb-1">${produto.nome}</h5>
            <p class="mb-1">Preço: R$ ${produto.preco}</p>
            <p class="mb-1">${produto.descricao}</p>
            <button class="btn btn-danger btn-sm float-right" onclick="deletarProduto(${produto.id})">Deletar</button>
        `;
        produtosDiv.appendChild(produtoDiv);
    });
}

async function deletarProduto(id) {
    await fetch(`/produtos/${id}`, { method: 'DELETE' });
    carregarProdutos();
}

document.getElementById('produtoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    await fetch('/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `nome=${nome}&preco=${preco}&descricao=${descricao}`
    });

    carregarProdutos();
});

carregarProdutos();
