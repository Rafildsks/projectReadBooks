const buscaInput = document.getElementById("busca-input");
const resultadoPesquisa = document.getElementById("resultado-pesquisa");
const spanUsuario = document.getElementById("span-usuario");

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
          <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center border border-gray-200">
            <img src=""
            alt="${book.title}"
            class="w-36 h-52 object-cover rounded-md bg-gray-100">
            <h2 class="mt-4 text-lg font-bold text-gray-800 line-clamp-2">${book.title}
            </h2>
            <h3 class="mt-1 text-sm text-gray-500">
              ${book.author_name[0]}
            </h3>
            <button class="mt-5 w-full bg-[#006970] text-white py-2 rounded-lg font-medium hover:bg-[#00535a] transition-colors duration-300 cursor-pointer">
              + Adicionar
            </button>
          </div>
      `;
      });
    })
    .catch((error) => console.error(error.message));
}

function handleLogout() {
  // localStorage.clear() - Todo o armazenamento do local é removido (limpado)
  localStorage.removeItem("usuarioLogado");
  window.location.href = "./index.html";
}
