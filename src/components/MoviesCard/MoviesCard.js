import React from "react";
import "./MoviesCard.css"

function MoviesCard(props){
  return(
    <section className="movies-card">
      <div className="card">
      <button className="button_save">Сохранить</button>
      <img className="card__img" src={props.card} alt="Тут картинка" />
        <div className="card__description">
          <ul className="card__description-container">
            <li className="card__title">{props.title}</li>
            <li className="card__duration">{props.time}</li>
          </ul>
        </div>
       </div>
    </section>
  )
}

export default MoviesCard;