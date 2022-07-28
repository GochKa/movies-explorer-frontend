import React from "react";
import { Link } from 'react-router-dom'
import "./Login.css"
import logo from "../../images/logo.svg";

function Login(){
  return(
    <section className="login">
      <Link to="/">
      <img src={logo} alt="Лого" className="login__logo"/>
      </Link>

      <form className="login__form">
      <h2 className="login__title">Рады видеть!</h2>
        <p className="login__form_text">E-mail</p>
        <input className="login__form_input"/>
        <p className="login__form_text">Пароль</p>
        <input className="login__form_input"/>
        <Link to="/movies">
          <button className="login__button">Войти</button>
        </Link>
        <div className="login__subtitle">
      <p className="login__text">Ещё не зарегистрированы?</p>
      <Link to="/signup" className="login__link_signup">Регистрация</Link>
      </div>
      </form>

    </section>
  )
}

export default Login