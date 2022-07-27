import React from "react";
import "./MoviesCardList.css"

import MoviesCard from "../MoviesCard/MoviesCard";
import card1 from "../../images/Card_1.svg"
import card2 from "../../images/Card_2.svg"
import card3 from "../../images/Card_3.svg"
function MoviesCardList(){
  return(
    <section className="movies-card-list">
      <MoviesCard card={card1} title={"33 слова о дизайне"} time={"1ч 17м"}/>
      <MoviesCard card={card2} title={"Киноальманах «100 лет дизайна»"} time={"1ч 17м"}/>
      <MoviesCard card={card3} title={"В погоне за Бенкси"} time={"1ч 17м"}/>
    </section>
  )
}

export default MoviesCardList;