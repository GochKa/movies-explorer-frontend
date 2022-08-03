import React from "react";
import "./Movies.css"

import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NavTab from "../NavTab/NavTab";
import Footer from "../Footer/Footer"
function Movies(props){

  return(
    <section className="movies">
      <NavTab onClick={props.onMenu}/>
      <div className="movies__filter_desctop">
        <SearchForm onGetMovies={props.onGetMovies}/>
        <FilterCheckbox 
          onFilter={props.onFilter}
          isShortMovie={props.isShortMovie}
        />
      </div>
      <MoviesCardList 
        movies={props.movies}
        onGetMovies={props.handleGetMovies}
        onAddMovie={props.onAddMovie}
        message={props.message}
        savedMovies={props.savedMovies}
        likedMovies={props.likedMovies}/>
      <Footer />
    </section>
  )
}

export default Movies