import React from "react";
import { Link } from 'react-router-dom'
import "./Register.css"
import logo from "../../images/logo.svg";
function Register(){
  return(
    <section className="register">
      <Link to="/">
      <img src={logo} alt="Лого" className="register__logo"/>
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <p className="register__form_input-title">Имя</p>
        <input className="register__form_input"/>
        <p className="register__form_input-title">E-mail</p>
        <input className="register__form_input"/>
        <p className="register__form_input-title">Пароль</p>
        <input className="register__form_input"/>
        <Link to="/signin">
        <button className="rerister__button">Зарегестрироваться</button>
        </Link>
      </form>
      <div className="register__subtitle">
      <p className="register__text">Уже зарегистрированны?</p>
      <Link to="/signin" className="register__link_signin">Войти</Link>
      </div>
    </section>
  )
}

export default Register