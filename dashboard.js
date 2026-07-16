const buscaInput = document.getElementById("busca-input");
const resultadoPesquisa = document.getElementById("resultado-pesquisa");
const spanUsuario = document.getElementById("span-usuario");
const divMeta = document.getElementById("div-meta");

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuario) {
  window.location.href = "./index.html";
}

spanUsuario.innerHTML = `Olá, ${usuario.nome}`;

function getBooks(event) {
  event.preventDefault();
  const pesquisaLivro = encodeURIComponent(buscaInput.value.trim());

  console.log(pesquisaLivro);

  fetch(`https://openlibrary.org/search.json?q=${pesquisaLivro}&language=por`)
    .then((res) => res.json())
    .then((dados) => {
      console.log(dados);
      const dadosBusca = dados.docs;

      dadosBusca.map((book) => {
        const capa = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        resultadoPesquisa.innerHTML += `
    <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-52 flex flex-col">
    <img
      src="${capa}"
      alt="${book.title}"
      class="w-full h-59 object-fill"
    >
    <div class="p-5 flex flex-col flex-1">
    <h2 class="text-xl font-bold text-gray-800 line-clamp-2">
      ${book.title}
    </h2>
    <h3 class="text-sm text-gray-500 mt-2">
      ${book.author_name[0]}
    </h3>
    <button type="button" onclick="adicionarMeta('${book.title}','${capa}')"
      class="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300 flex items-center justify-center gap-2"
    >
      <span class="text-xl">+</span>
      Adicionar
    </button>
  </div>
</div>
    `;
      });
    })
    .catch((error) => console.error(error.message));
}

function handleLogout() {
  // localStorage.clear() - limpa todo o armazenamento local do site
  localStorage.removeItem("usuarioLogado");
  window.location.href = "./index.html";
}

function adicionarMeta(title, capa) {
  divMeta.innerHTML += `
    <img
      src="${capa}"
      alt="${title}"
      class="w-full h-59 object-fill"
    >
  `;
}
