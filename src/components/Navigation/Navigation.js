import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

import close from "../../images/Close_nav.svg"
import profile from "../../images/Nav_profile_ivon.svg"
function Navigation(props){
  
  return(
    <section className={`navigation ${props.isOpen ? "navigation_opened" : ""}`} onClick={props.onClose}>
      <button className="navigation__close" onClick={props.onClose}>
        <img src={close} alt="Закрыть" className="navigation__close_img"/>
      </button>
      <ul className="navigation__list">
        <li className="navigation__list_item">
          <Link to="/" className="navigation__list_item-link">Главная</Link>
        </li>
        <li className="navigation__list_item">
          <Link to="/movies" className="navigation__list_item-link">Фильмы</Link>
        </li>
        <li className="navigation__list_item">
          <Link to="/saved-movies" className="navigation__list_item-link">Сохранённые фильмы</Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation__link_profile">
        <p className="navigation__link_profile-text">Аккаунт</p>
        <div className="navigation__link_profile-block">
          <img className="navigation__link_profile-icon" src={profile} alt="Профиль"/>
        </div>
      </Link>
    </section>
  )
}

export default Navigation;