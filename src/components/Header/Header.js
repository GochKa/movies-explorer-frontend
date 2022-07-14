import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";

function Header(){
  return(
    <header className="header">
      <img src={logo} className="header__logo" alt="logo"></img>
      <button className="signup-button">Регистрация</button>
      <button className="signin-button">Войти</button>
    </header>
  )
}

export default Header;