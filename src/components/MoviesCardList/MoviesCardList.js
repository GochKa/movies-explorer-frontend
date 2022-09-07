import React, { Suspense } from "react";
import "./MoviesCardList.css"
import More from "../More/More";
import { 
  MAX_NUMBER_OF_CARDS, 
  MIN_NUMBER_OF_CARDS,
  MAXIMUM_MOVIES_1280,
  MAXIMUM_MOVIES_768,
  MAXIMUM_MOVIES_320,
  AMOUNT_1280,
  AMOUNT_768,
  AMOUNT_320 } from "../../utils/config";

import Preloader from "../Preloader/Preloader";  


const MoviesCard = React.lazy(() => import("../MoviesCard/MoviesCard"))
function MoviesCardList(props){
  const [counter, setCounter] = React.useState();
  const [increment, setIncrement] = React.useState();
  function showMoreMovies() {
    setCounter(counter + increment);
  }




function countOfCard(){
  const width = window.innerWidth;

  if (width >= 1280) {
    setCounter(MAXIMUM_MOVIES_1280)
    setIncrement(AMOUNT_1280)
  } else if (width <=1280 && width >= 768) {
    setCounter(MAXIMUM_MOVIES_768)
    setIncrement(AMOUNT_768)
  } else if (width <= 768 && width >= 320) {
    setCounter(MAXIMUM_MOVIES_320)
    setIncrement(AMOUNT_320)
  }
}

React.useEffect(() =>{
  countOfCard()
}, [])


  return(
    <>
    <section className="movies-card-list">
    <Suspense fallback={<Preloader />}>
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
          </Suspense>
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