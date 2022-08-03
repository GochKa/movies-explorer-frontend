import React from "react";
import "./MoviesCard.css"
import mainApi from "../../utils/MainApi"
function MoviesCard(props, {savedMoviesCardList}){
  console.log(savedMoviesCardList)
  const [isLiked, setIsLiked] = React.useState(false);
  function onAddClick() {
    if (!isLiked) {
      mainApi
        .addMovie({
          movieId: props.id,
          country: props.country,
          director: props.director,
          duration: props.duration,
          year: props.year,
          description: props.description,
          image: `https://api.nomoreparties.co/${props.image.url}`,
          trailerLink: props.trailerLink,
          thumbnail: `https://api.nomoreparties.co/${props.image.formats.thumbnail.url}`,
          nameRU: props.nameRU,
          nameEN: props.nameEN,
        })
        .then(() => {
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .getUserMovies()
        .then((savedmovies) => {
          const newFilms = savedmovies.data.filter(
            (item) => item.nameRU === props.nameRU
          );
          mainApi
            .deleteMovie(newFilms[0]._id)
            .then(() => {
              console.log("1");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
      setIsLiked(false);
    }
  }

  

  return(
    <section className="movies-card">
      <div className="card">
      <button   className="button_save" onClick={onAddClick}>Сохранить</button>
      <a         
        href={props.trailerLink}
        target="_blank"
        rel="noopener noreferrer nofollow
        ">
      <img className="card__img"  alt={props.name}
           src={`${
            savedMoviesCardList
              ? `${props.image}`
              : `https://api.nomoreparties.co/${props.image.url}`
          }`}/>
        </a>
        <div className="card__description">
          <ul className="card__description-container">
            <li className="card__title">{props.name || props.movie.nameRU}</li>
            <li className="card__duration">{`${Math.floor(
            (props.duration || props.movie.duration) / 60
          )}ч ${(props.duration || props.movie.duration) % 60}м`}</li>
          </ul>
        </div>
       </div>
    </section>
  )
}

export default MoviesCard;
