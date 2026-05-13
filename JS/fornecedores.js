const ref = firebase.database().ref("fornecedores");

// Função para renderizar tabela
function renderizarTabela(dados_tabela) {
    $("#lista").empty();
    
    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Email</th>
            <th>Estado</th>
            <th colspan="2">Opções</th>
        </tr>
    `);
    
    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;
        
        if (reg) {
            $("#lista").append(`
                <tr>
                    <td>${id}</td>
                    <td>${reg.nome}</td>
                    <td>${reg.cnpj}</td>
                    <td>${reg.email}</td>
                    <td>${reg.estado}</td>
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

// Salvar novo fornecedor
$("#salvar").click(function () {
    let nome = $("#nome").val();
    let cnpj = $("#cnpj").val();
    let email = $("#email").val();
    let estado = "";

    if ($("#sp").is(":checked")) {
        estado = "SP";
    } else if ($("#rj").is(":checked")) {
        estado = "RJ";
    } else if ($("#mg").is(":checked")) {
        estado = "MG";
    }

    if (nome === "" || cnpj === "" || email === "" || estado === "") {
        alert('Preencha todos os campos');
        return;
    }

    ref.push({nome, cnpj, email, estado}); 
    limpar();
});

function limpar(){
    $("#nome").val("");
    $("#cnpj").val("");
    $("#email").val("");
    $("input[name='estado']").prop("checked", false);
    $("#nome").focus();
}