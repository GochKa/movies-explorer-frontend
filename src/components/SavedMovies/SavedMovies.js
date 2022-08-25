import React from "react";
import "./SavedMovies.css";

import NavTab from "../NavTab/NavTab";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SavedMovies(props){

  return(
    <section className="savedmovies">
      <NavTab onClick={props.onMenu}/>
      <div className="movies__filter_desctop">
        <SearchForm onGetMovies={props.onGetMovies}/>
        <FilterCheckbox         
          onFilter={props.onFilter}
          isShortMovie={props.isShortMovie}/>
      </div>
      {props.movies.length > 0 ? (
        <MoviesCardList
          isSavedMovies={props.isSavedMovies}
					movies={props.movies}
          onGetMovies={props.onGetMovies}
          onDelete={props.onDelete}
          message={props.message}
        />
      ) : (
        <p className="movies-message">У вас пока нет сохраненных фильмов</p>
      )}
      <Footer />
    </section>
  )
}

export default SavedMovies;