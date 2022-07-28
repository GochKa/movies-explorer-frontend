import React from "react";
import "./SavedMovies.css";

import NavTab from "../NavTab/NavTab";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import More from "../More/More";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SavedMovies(props){
  return(
    <section className="savedmovies">
      <NavTab onClick={props.onMenu}/>
      <div className="movies__filter_desctop">
        <SearchForm />
        <FilterCheckbox />
      </div>
      <MoviesCardList />
      <More />
      <Footer />
    </section>
  )
}

export default SavedMovies;