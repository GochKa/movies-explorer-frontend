import React from "react";
import { Link } from 'react-router-dom'
import "./Login.css"
import logo from "../../images/logo.svg";

function Login(props){

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  function handleChangeEmail(e) {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );

    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    if (e.target.value.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  React.useEffect(() => {
    if (props.loggedIn) {
      setEmail("");
      setPassword("");
    }
  }, [props.loggedIn]);

  React.useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return(
    <section className="login">
      <Link to="/">
      <img src={logo} alt="Лого" className="login__logo"/>
      </Link>

      <form className="login__form" onSubmit={handleSubmit}>
      <h2 className="login__title">Рады видеть!</h2>
        <p className="login__form_text">E-mail</p>
        <input className="login__form_input" onChange={handleChangeEmail} required={true} value={email}/>
        <span id="name-input-error" className="form__item-error">
            {emailError}
          </span>
        <p className="login__form_text">Пароль</p>
        <input className="login__form_input" onChange={handleChangePassword} required={true} value={password}/>
        <span id="about-input-error" className="form__item-error">
            {passwordError}
          </span>
        <button
            className={`login__button ${
              !formValid ? "login__button_disabled" : ""
            }`}
            type="submit"
            disabled={!formValid}
          >
            Войти
          </button>
        <div className="login__subtitle">
      <p className="login__text">Ещё не зарегистрированы?</p>
      <Link to="/signup" className="login__link_signup">Регистрация</Link>
      </div>
      </form>

    </section>
  )
}

export default Login
