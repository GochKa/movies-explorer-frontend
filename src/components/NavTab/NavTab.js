import React from "react";
import "./NavTab.css";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";
import menu from "../../images/Movies_menu.svg"
import profile from "../../images/Nav_profile_ivon.svg"
function NavTab(props){
  return(
    <div className="navtab__header">
    <Link to="/">
      <img className="navtab__header_logo" src={logo} alt="Лого"/>
    </Link>
    <div className="navtab__header_links">
      <Link to="/movies" className="navtab__header_links-item">Фильмы</Link>
      <Link to="/saved-movies" className="navtab__header_links-item">Сохраненные фильмы</Link>
      <Link to="/profile" className="navtab__header_links-item">
        Аккаунт
        <div className="navtab__header_links-icon">
        <img src={profile} alt="Профиль" className="navtab__header_links-img"/>  
      </div>
      </Link>

    </div>
    <button className="navtab__header_menu" onClick={props.onClick}>
      <img src={menu} alt="Меню"/>
    </button>
  </div>
    )
}

export default NavTab