import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

import NavTab from "../NavTab/NavTab";

function Profile(props){
  return (
    <section className="profile">
      <NavTab onClick={props.onMenu}/>
      <form className="profile__form">
        <div className="profile__form_container">
          <h2 className="profile__form_container-title">Привет, Георгий!</h2>
          <fieldset className="profile__form_inputs">
            <div className="profile__form_inputs-container">
              <label className="form__field-profile">
                Имя
              </label>
              <input className="form__item form__item-profile" />
            </div>
            <span id="name-input-err" className="form-item-err"></span>
            <div className="profile__form_inputs-container">
              <label className="form__field-profile">
                Почта
              </label>
              <input className="form__item form__item-profile" />
            </div>
            <span id="name-input-err" className="form-item-err"></span>
          </fieldset>
        </div>
        <button className="profile__edit-button">Редактировать</button>
        <Link to="/signin" className="profile__logout-button">Выйти из аккаунта</Link>
      </form>
    </section>
  )
}

export default Profile;