import React from "react";
import "./SearchForm.css";
import sbmbutton from "../../images/find_form.svg"
function SearchForm(){
  return(
    <form className="searchform">
      <input className="searchform__input" placeholder="Фильм"/>
      <button type="submit" className="searchform__submit">
        <img src={sbmbutton} alt="кнопка формы"/>
      </button>
    </form>
  )
}

export default SearchForm;