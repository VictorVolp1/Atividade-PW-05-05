const ref = db.ref("categorias");

$("#salvar").click(function () {
    let nome = $("#nome").val();
    let informacoes = $("#informacoes").val();

    if(nome === "" || informacoes === "") {
        alert('Prencha todos os campos');
        return;
    }

    ref.push({nome, informacoes }); 
    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();
 
     $("#lista").append(`
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Informações</th>
                <th colspan="2">Opções</th>
            </tr>
`);
    dados_tabela.forEach(registro =>  {
        let reg = registro.val();
        let id = registro.key;
 
        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.informacoes}</td>
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
    });
});

function limpar(){
    $("#nome").val("");
    $("#informacoes").val("");
    $("#nome").focus();
}