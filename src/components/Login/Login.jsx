import { useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

export default function Login({ handleLogin, loginError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    !emailError &&
    !passwordError;

  function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);

    handleLogin({ email, password })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  return (
    <div className="login">
      {isLoading && (
        <div className="login__preloader-overlay">
          <Preloader />
        </div>
      )}

      <div className="login-card">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
            onInvalid={(e) => setEmailError(e.target.validationMessage)}
            required
            disabled={isLoading}
          />
          <span className="email-input-error form__input-error">
            {emailError}
          </span>

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={handlePasswordChange}
            onInvalid={(e) => setPasswordError(e.target.validationMessage)}
            required
            disabled={isLoading}
          />
          <span className="password-input-error form__input-error">
            {passwordError}
          </span>

          <span className="login-form__error">{loginError}</span>

          <button
            type="submit"
            className="login-form__submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <Link className="login__signin-link" to="/signup">
            Ainda não é membro? Inscreva-se aqui!
          </Link>
        </form>
      </div>
    </div>
  );
}
