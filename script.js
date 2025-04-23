let lista = [];

function adicionar(descricao, valor, categoria) {
    const item = {
        id: Date.now(),
        descricao,
        valor: parseFloat(valor),
        categoria
    };
    lista.push(item); // Adiciona o item à lista global
    updateLista();
    calculateTotal();
}

function calculateTotal() {
    const total = lista.reduce((acc, item) => acc + item.valor, 0); // Calcula o total
    document.getElementById("total").innerText = total.toFixed(2); // Atualiza o total
}

function removeLista(id) {
    lista = lista.filter(item => item.id !== id); // Remove o item pelo ID
    updateLista();
    calculateTotal();
}

function editarLista(id) {
    const item = lista.find(item => item.id === id); // Encontra o item pelo ID
    if (item) {
        // Preenche os campos do formulário com os dados do item
        document.getElementById('descricao').value = item.descricao;
        document.getElementById('valor').value = item.valor;
        document.getElementById('categoria').value = item.categoria;

        // Remove o item da lista para ser atualizado ao salvar
        removeLista(id);
    }
}

function updateLista() {
    const listaElement = document.getElementById("listaDeGastos"); // Corrigido o ID
    listaElement.innerHTML = ""; // Limpa a lista atual
    lista.forEach(item => {
        const li = document.createElement("li");

        // Adiciona a classe "valor-alto" para valores acima de R$100,00
        li.className = "listaDeGastos";
        if (item.valor > 100) {
            li.classList.add("valor-alto");
        }

        li.innerText = `${item.descricao} - R$ ${item.valor.toFixed(2)} (${item.categoria})`;

        // Botão de remover
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remover";
        removeButton.onclick = () => removeLista(item.id);
        li.appendChild(removeButton);

        // Botão de editar
        const editButton = document.createElement("button");
        editButton.innerText = "Editar";
        editButton.onclick = () => editarLista(item.id);
        li.appendChild(editButton);

        listaElement.appendChild(li);
    });
}

document.getElementById('formGastos').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const categoria = document.getElementById('categoria').value;
    adicionar(descricao, valor, categoria);
    this.reset(); // Limpa os campos do formulário
});