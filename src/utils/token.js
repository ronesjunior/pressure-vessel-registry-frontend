const TOKEN_KEY = "token";

function setToken(jwt) {
  localStorage.setItem(TOKEN_KEY, jwt);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY); // Então ela vai no navegador e procura o valor salvo na chave "token"
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export default { setToken, getToken, removeToken };
