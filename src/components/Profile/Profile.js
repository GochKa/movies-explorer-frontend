import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import NavTab from "../NavTab/NavTab";


function Profile(props){

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [changedName, setChangedName] = React.useState(false);
  const [changedEmail, setChangedEmail] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [isInputDisabled, setIsInputDisabled] = React.useState(true);
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  //////////////////////////// Инпут name ///////////////////////////////
  function handleNameChange(e) {
    setChangedName(true);
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
  ///////////////////////////////////////////////////////////////////

  //////////////////////////// Инпут email ///////////////////////////////
  function handleEmailChange(e) {
    setChangedEmail(true);
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
  ///////////////////////////////////////////////////////////////////

  function changeInputDisabled() {
    setIsInputDisabled(!isInputDisabled);
  }

////////////////////////////// Сабмит изменения //////////////////////////////  
  function handleSubmit(e) {
    e.preventDefault();
    props.onEditUser({
      name,
      email,
    });
    changeInputDisabled();
  }
//////////////////////////////////////////////////////////////////////////  

React.useEffect(() => {
  setName(currentUser.name);
  setEmail(currentUser.email);
}, [currentUser]);

React.useEffect(() => {
  if (nameError || emailError) {
    setFormValid(false);
  } else {
    setFormValid(true);
  }
}, [nameError, emailError]);

React.useEffect(() => {
  if (currentUser.name === name && currentUser.email === email) {
    setFormValid(false);
  } else {
    setFormValid(true);
  }
}, [name, email, currentUser.name, currentUser.email]);



  return (
    <section className="profile">
      <NavTab onClick={props.onMenu}/>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form_container">
          <h2 className="profile__form_container-title">{`Привет, ${currentUser.name}!`}</h2>
          <fieldset className="profile__form_inputs">
            <div className="profile__form_inputs-container">
              <label className="form__field-profile">
                Имя
              </label>
              <input className="form__item form__item-profile" 
              type="text"
              value={name}
              onChange={handleNameChange}
              disabled={!isInputDisabled}/>
                <span id="name-input-err" className="form-item-err">{nameError}</span>
            </div>
            <div className="profile__form_inputs-container">
              <label className="form__field-profile">
                Почта
              </label>
              <input className="form__item form__item-profile" 
              type="text"
              value={email}
              onChange={handleEmailChange}
              disabled={!isInputDisabled}/>
                <span id="name-input-err" className="form-item-err">{emailError}</span>
            </div>
          </fieldset>
        </div>
        <button
                  className={`profile__edit-button ${
							!formValid || name < 2 || email < 2 ? "profile__edit-button_disabled" : ""
                  }`}
                  type="submit"
                  disabled={!formValid || name < 2 || email < 2}
                  onClick={changeInputDisabled}
                >
                  Редактировать
                </button>
        <Link to="/signin" className="profile__logout-button">Выйти из аккаунта</Link>
      </form>
    </section>
  )
}

export default Profile;
