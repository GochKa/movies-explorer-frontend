import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import "./Register.css"
import logo from "../../images/logo.svg";
function Register(props){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);


  function handleChangeName(e) {
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени должна быть не менее 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени должна должна быть не более 30 символов");
    } else if (!validName) {
      setNameError("Имя должно быть указано латиницей");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

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
    props.onRegister(name, email, password);
  }

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return(
    <section className="register">
      <Link to="/">
      <img src={logo} alt="Лого" className="register__logo"/>
      </Link>
      <form className="register__form" onSubmit={handleSubmit}>
      <h1 className="register__title">Добро пожаловать!</h1>
        <p className="register__form_input-title">Имя</p>
        <input className="register__form_input" onChange={handleChangeName}/>
        <span id="name-input-error" className="form-item-err">
          {nameError}
        </span>
        <p className="register__form_input-title">E-mail</p>
        <input className="register__form_input" onChange={handleChangeEmail}/>
        <span id="name-input-error" className="form-item-err">
          {emailError}
        </span>
        <p className="register__form_input-title">Пароль</p>
        <input className="register__form_input" onChange={handleChangePassword}/>
        <span id="name-input-error" className="form-item-err">
          {passwordError}
        </span>
        
      <div className="form__handlers">
        <div className="form__item-response">
          {props.message}
        </div>
        <button
          className={`rerister__button ${
            !formValid ? "rerister__button_disabled" : ""
          }`}
          type="submit"
          disabled={!formValid}
        >
          Зарегистрироваться
        </button>
        </div>
      </form>
      <div className="register__subtitle">
      <p className="register__text">Уже зарегистрированны?</p>
      <Link to="/signin" className="register__link_signin">Войти</Link>
      </div>
    </section>
  )
}

export default Register