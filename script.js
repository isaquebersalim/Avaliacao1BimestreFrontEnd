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

function updateLista() {
    const listaElement = document.getElementById("listaDeGastos"); // Corrigido o ID
    listaElement.innerHTML = ""; // Limpa a lista atual
    lista.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.descricao} - R$ ${item.valor.toFixed(2)} (${item.categoria})`;
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remover";
        removeButton.onclick = () => removeLista(item.id);
        li.appendChild(removeButton);
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