import React from 'react';
import { Link } from 'react-router-dom'
import "./Header.css";
import logo from "../../images/logo.svg";

function Header(){
  return(
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <Link to="signup" className="header__link">
         Регистрация
      </Link>
      <Link to="signin" className="header__link">
        Войти
      </Link>
    </header>
  )
}

export default Header;