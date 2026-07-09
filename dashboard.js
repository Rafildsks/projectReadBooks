const buscaInput = document.getElementById("busca-input");
const resultadoPesquisa = document.getElementById("resultado-pesquisa")

function getBooks(event) {
  event.preventDefault();
  const pesquisaLivro = encodeURIComponent(buscaInput.value.trim());

  console.log(pesquisaLivro);
  // https://covers.openlibrary.org/b/id/${cover_i}-M.jpg
  fetch(`https://openlibrary.org/search.json?q=${pesquisaLivro}&language=por`)
    .then((res) => res.json())
    .then((dados) => {
      console.log(dados);
      const dadosBusca = dados.docs;

      dadosBusca.map(
        (book) =>
          (resultadoPesquisa.innerHtml += `
      <div>
        <img src="" alt="">
        <h2>${book.title}</h2>
        <h3>${book.autor_name[0]}</h3>
        <button>+</button>
      </div>
      `),
      );
    })
    .catch((error) => console.error(error.message));
}