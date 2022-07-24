import React from "react";
import "./Promo.css"
import promo__logo from "../../images/landing-logo.svg"

function Promo(){
  return(
    <section className="promo">
      <div className="promo__info">
        <img src={promo__logo} alt="Картнка промо" className="promo__img"></img>
        <div className="promo__flex">
        <h1 className="promo__title">Учебный проект студента факультета
        <br>
        </br> Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className="promo__button">Узнать больше</button>     
      </div>

      </div>
    </section>
  )
}

export default Promo;