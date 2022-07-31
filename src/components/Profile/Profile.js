import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import  CurrentUserContext  from "../../context/CurrentUserContext"
import NavTab from "../NavTab/NavTab";

function Profile(props){
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateUser({
      name: name,
      email: email,
    });
  }
  return (
    <section className="profile">
      <NavTab onClick={props.onMenu}/>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form_container">
          <h2 className="profile__form_container-title">Привет, {currentUser.name}!</h2>
          <fieldset className="profile__form_inputs">
            <div className="profile__form_inputs-container">
              <label className="form__field-profile">
                Имя
              </label>
              <input 
              className="form__item form__item-profile"
              onChange={handleNameChange}
              minLength={3}
              maxLength={30}
              type="text"
              id="input-name"
              name="input-name"
              placeholder={currentUser.name}
              autoComplete="off"
               />
            </div>
            <span id="name-input-err" className="form-item-err"></span>
            <div className="profile__form_inputs-container">
              <label className="form__field-profile">
                Почта
              </label>
              <input 
              className="form__item form__item-profile"
              onChange={handleEmailChange}
              type="email"
              id="input-email"
              name="input-email"
              minLength={3}
              maxLength={30}
              placeholder={currentUser.email}
              autoComplete="off"
               />
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