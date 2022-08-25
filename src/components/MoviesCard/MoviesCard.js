import React from "react";
import "./MoviesCard.css"

import { baseUrl } from "../../utils/config";
function MoviesCard(props){


  return(
    <section className="movies-card">
          <button
            className="button_save"
            > Сохранить
          </button>
      <a  href={props.trailerLink}
        target="_blank"
        rel="noopener noreferrer nofollow">
      <img
          className="card__img"
          alt={props.name}
          src={
            props.isSavedMovies
              ? props.movie.image
              : `${baseUrl}${
                  props.movie.image ? props.movie.image.url : props.image
                }`
          } />
          </a>
        <div className="card__description">
          <ul className="card__description-container">
            <li className="card__title">{props.name || props.movie.nameRU}</li>
            <li className="card__duration">
                {`${Math.floor(
                 (props.duration || props.movie.duration) / 60
                 )}ч ${(props.duration || props.movie.duration) % 60}м`
                }
          </li>
          </ul>
        </div>
    </section>
  )
}

export default MoviesCard;