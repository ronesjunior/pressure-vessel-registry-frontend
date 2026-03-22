import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegistration, registrationError }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    !emailError &&
    !passwordError &&
    !nameError;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    handleRegistration({
      name,
      email,
      password,
    });
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }

  return (
    <div className="Register">
      <div className="Register-card">
        <h2>Inscrever</h2>

        <form className="Register-form" onSubmit={handleSubmit} noValidate>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
            onInvalid={(e) => setEmailError(e.target.validationMessage)}
            required
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
            minLength="6"
          />
          <span className="password-input-error form__input-error">
            {passwordError}
          </span>

          <label>Nome de usuário</label>
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={name}
            onChange={handleNameChange}
            onInvalid={(e) => setNameError(e.target.validationMessage)}
            required
            minLength="2"
          />
          <span className="name-input-error form__input-error">
            {nameError}
          </span>

          <span className="register-form__error">{registrationError}</span>

          <button
            className="register-form__submit"
            type="submit"
            disabled={!isFormValid}
          >
            Inscrever
          </button>

          <Link className="register__signin-link" to="/signin">
            Já é membro? Faça o login aqui!
          </Link>
        </form>
      </div>
    </div>
  );
}
