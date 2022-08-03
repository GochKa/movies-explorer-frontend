import React from "react";
import "./MoviesCardList.css"
import { MIN_NUMBER_OF_CARDS, MAX_NUMBER_OF_CARDS } from "../../utils/config";
import MoviesCard from "../MoviesCard/MoviesCard";
import More from "../More/More";

function MoviesCardList(props, {savedMoviesCardList}){
  const [isLikedMovie, setIsLikedMovie] = React.useState(false);
  React.useEffect(() => {
    const savedMovies = localStorage.getItem("savedMovies");
    const films = JSON.parse(localStorage.getItem("films"));
    if (savedMovies === null || films === null) {
      return;
    }
    films.map((i) => {
      const likedMovies = JSON.parse(savedMovies).includes(i.nameRU);
      if (true) {
        setIsLikedMovie(true);
      }
      console.log(likedMovies)
      return likedMovies;
    });
    console.log(isLikedMovie)
    
  }, [isLikedMovie]);

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
                  name={movie.nameRU}
                  duration={movie.duration}
                  key={id}
                  movieId={movie.movieId}
                  {...movie}
                  isSavedMovies={props.isSavedMovies}
                  onAddMovie={props.onAddMovie}
                  onDelete={props.onDelete}
                  savedMovies={props.savedMovies}
                  likedMovies={props.likedMovies}
                  savedMoviesCardList={savedMoviesCardList}
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