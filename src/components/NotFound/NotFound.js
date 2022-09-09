import React from "react";
import {useHistory} from "react-router-dom"
import "../NotFound/NotFound.css";

function NotFound() {

  const history = useHistory();
  function goBack(){
    history.goBack()
  }
  return (
    <section className="not-found">
      <h1 className="not-found__status">404</h1>
      <p className="not-found__message">Страница не найдена</p>
      <button className="not-found__back" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;