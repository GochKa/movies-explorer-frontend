import React from "react";
import "./Movies.css"

import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NavTab from "../NavTab/NavTab";
// import Navigation from "../Navigation/Navigation";
import More from "../More/More";
import Footer from "../Footer/Footer"
function Movies(props){

  return(
    <section className="movies">
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

export default Movies