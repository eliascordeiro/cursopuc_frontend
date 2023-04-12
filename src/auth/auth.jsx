export function isLoggedIn() {
  return sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("access_token") !== "undefined";
}

export function deleteTokens() {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("dados");
  sessionStorage.removeItem("autenticacao");
  sessionStorage.removeItem("painel");
}

export function requiredAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
