// Banco de dados
const ref = firebase.database().ref("clientes");

// Função para renderizar tabela
function renderizarTabela(dados_tabela) {
    $("#lista").empty();
    
    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th colspan="2">Opções</th>
        </tr>
    `);
    
    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;
        
        if (reg && reg.type === "cliente") {
            $("#lista").append(`
                <tr>
                    <td>${id}</td>
                    <td>${reg.nome}</td>
                    <td>${reg.email}</td>
                    <td>
                        <button class="btn btn-outline-danger btn-sm">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-outline-warning btn-sm">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </td>
                </tr>
            `);
        }
    });
}

// Carregar dados ao abrir a página
ref.on("value", renderizarTabela);

// Salvar novo cliente
$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();
    
    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }
    
    ref.push({
        nome: nome,
        type: "cliente",
        email: email
    });
    
    // Limpar os campos
    $("#nome").val("");
    $("#email").val("");
    
});