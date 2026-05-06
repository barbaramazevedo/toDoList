function showAlert(containerId, type, message) {
    const el = document.getElementById(containerId);
    el.innerHTML = `<div class="alert alert-${type} py-2">${message}</div>`;
}

function adicionarItemLista() {
    const input = document.getElementById('exampleInputItem');
    const texto = input.value.trim();
    if (!texto) return;

    const li = document.createElement('li');
    li.className = 'd-flex align-items-center gap-2 mb-1';
    li.innerHTML = `
        <input type="checkbox" class="form-check-input mt-0">
        <span>${texto}</span>
    `;
    document.getElementById('listaItens').appendChild(li);
    input.value = '';
    input.focus();
}

document.getElementById('btnAdicionarItem').addEventListener('click', adicionarItemLista);
document.getElementById('exampleInputItem').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        adicionarItemLista();
    }
});

document.getElementById('categoriaLista').addEventListener('change', function () {
    const novaCategoria = document.getElementById('novaCategoria');
    if (this.value === 'nova') {
        novaCategoria.classList.remove('d-none');
        novaCategoria.required = true;
    } else {
        novaCategoria.classList.add('d-none');
        novaCategoria.required = false;
        novaCategoria.value = '';
    }
});

document.getElementById('btnAdicionar').addEventListener('click', function () {
    const titulo = document.getElementById('exampleInputTitle').value.trim();
    const categoria = document.getElementById('categoriaLista').value;
    const novaCategoria = document.getElementById('novaCategoria').value.trim();

    const itens = document.getElementById('listaItens').children;

    if (!titulo) {
        showAlert('adicionarListaAlert', 'danger', 'Adicione um título.');
        return;
    }
    if (!categoria) {
        showAlert('adicionarListaAlert', 'danger', 'Selecione uma categoria.');
        return;
    }
    if (categoria === 'nova' && !novaCategoria) {
        showAlert('adicionarListaAlert', 'danger', 'Digite o nome da nova categoria.');
        return;
    }
    if (itens.length === 0) {
        showAlert('adicionarListaAlert', 'danger', 'Adicione pelo menos um item.');
        return;
    }

    if (categoria === 'nova') {
        const select = document.getElementById('categoriaLista');
        const option = new Option(novaCategoria, novaCategoria.toLowerCase());
        select.add(option, select.options[select.options.length - 1]);
    }

    showAlert('adicionarListaAlert', 'success', 'Lista adicionada!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('adicionarLista')).hide();
        document.getElementById('novaListaForm').reset();
        document.getElementById('novaCategoria').classList.add('d-none');
        document.getElementById('listaItens').innerHTML = '';
        document.getElementById('adicionarListaAlert').innerHTML = '';
    }, 800);
});

document.getElementById('btnSalvarCadastro').addEventListener('click', function () {
    const nome = document.getElementById('exampleInputNome').value.trim();
    const email = document.getElementById('exampleInputEmail1').value.trim();
    const senha = document.getElementById('exampleInputPassword1').value;
    const confirmar = document.getElementById('exampleInputConfirmPassword').value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nome || !email || !senha || !confirmar) {
        showAlert('cadastroAlert', 'danger', 'Preencha todos os campos.');
        return;
    }
    if (!emailValido) {
        showAlert('cadastroAlert', 'danger', 'Digite um email válido.');
        return;
    }
    if (senha !== confirmar) {
        showAlert('cadastroAlert', 'danger', 'As senhas não coincidem.');
        return;
    }

    showAlert('cadastroAlert', 'success', 'Cadastro realizado com sucesso!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('cadastroModal')).hide();
        document.getElementById('cadastroForm').reset();
        document.getElementById('cadastroAlert').innerHTML = '';
    }, 800);
});

document.getElementById('btnEntrar').addEventListener('click', function () {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginPassword').value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email || !senha) {
        showAlert('loginAlert', 'danger', 'Preencha email e senha.');
        return;
    }
    if (!emailValido) {
        showAlert('loginAlert', 'danger', 'Digite um email válido.');
        return;
    }
   
    showAlert('loginAlert', 'success', 'Login realizado com sucesso!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal')).hide();
        document.getElementById('loginForm').reset();
        document.getElementById('loginAlert').innerHTML = '';
    }, 800);
});

let cardParaDeletar = null;
const deleteModal = new bootstrap.Modal(document.getElementById('confirmarDeleteModal'));

document.addEventListener('click', function (e) {
    const btnLixo = e.target.closest('.btn-lixo');
    if (btnLixo) {
        cardParaDeletar = btnLixo.closest('.col');
        deleteModal.show();
    }
});

document.getElementById('btnConfirmarDelete').addEventListener('click', function () {
    if (cardParaDeletar) {
        cardParaDeletar.remove();
        cardParaDeletar = null;
    }
    deleteModal.hide();
});

document.getElementById('cadastroModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('cadastroAlert').innerHTML = '';
});
document.getElementById('loginModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('loginAlert').innerHTML = '';
});
