const btnLogin = document.getElementById("btn-login");
const btnCadastro = document.getElementById("btn-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const divSenha = document.getElementById("div-senha");

const tituloForm = document.getElementById("titulo-form");
const descricaoForm = document.getElementById("descricao-form");

btnCadastro.addEventListener("click", () => {
  btnLogin.classList.remove("bg-[#006970]", "text-white");
  btnCadastro.classList.add("bg-[#006970]", "text-white");
  formCadastro.classList.remove("hidden");
  formLogin.classList.add("hidden");

  tituloForm.textContent = "Criar conta";
  descricaoForm.textContent = "Preencha seus dados para criar uma conta.";
});

btnLogin.addEventListener("click", () => {
  btnLogin.classList.add("bg-[#006970]", "text-white");
  btnCadastro.classList.remove("bg-[#006970]", "text-white");
  formCadastro.classList.add("hidden");
  formLogin.classList.remove("hidden");

  tituloForm.textContent = "Iniciar sessão";
  descricaoForm.textContent = "Insira seus dados para acessar sua estante.";
});

function handleLogin(event) {
  event.preventDefault();
  const emailLogin = document.getElementById("emailLogin").value;
  const senhaLogin = document.getElementById("senhaLogin").value;

  fetch("http://localhost:3000/usuarios")
  .then(res => res.json())
  .then(dados => {
    const usuarios = dados
    console.log(dados)
    const usuario = usuarios.find((usuario) => (
      emailLogin === usuario.email && senhaLogin === usuario.senha
  ))

  if (usuario) {
    window.location.href = "./dashboard.html";
  } else {
    divSenha.removeChild(divSenha.lastChild);
    const alerta = document.createElement("p");
    alerta.textContent = "Email ou senha incorretos";
    alerta.classList.add("text-red-500");
    divSenha.appendChild(alerta);
  }
}
)
.catch(error => console.error(error.message))

}




function handleCadastro(event) {
  event.preventDefault();
  const emailCadastro = document.getElementById("emailCadastro").value;
  const senhaCadastro = document.getElementById("senhaCadastro").value;
  const nomeCadastro = document.getElementById("nome").value;
}
