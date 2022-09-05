import React from "react";
import "./MoviesCardList.css"
import More from "../More/More";
import { MAX_NUMBER_OF_CARDS, MIN_NUMBER_OF_CARDS } from "../../utils/config";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props){
  const [counter, setCounter] = React.useState(3);

  function showMoreMovies() {
    setCounter(counter + 3);
  }

  return(
    <>
    <section className="movies-card-list">
        {props.message ? (
            <p className="movies-message">{props.message}</p>
          ) : (
            props.movies
              .slice(0, counter)
              .map((movie, id) => (
                <MoviesCard
                  movie={movie}
                  name={movie.nameRU || movie.nameEN}
                  duration={movie.duration}
                  key={id}
                  id={movie._id}
                  {...movie}
                  isSavedMovies={props.isSavedMovies}
                  onAddMovie={props.onAddMovie}
                  onDelete={props.onDelete}
                  savedMovies={props.savedMovies}
                  likedMovies={props.likedMovies}
                />
              ))
          )}
    </section>
    {props.movies.length >= MIN_NUMBER_OF_CARDS &&
      props.movies.length > counter &&
      props.movies.length <= MAX_NUMBER_OF_CARDS &&
      !props.message ? (
				<More showMoreMovies={showMoreMovies}  />
      ) : (
        ""
      )}
    </>            
      )
}

export default MoviesCardList;