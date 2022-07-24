import React from "react";
import "./Portfolio.css"

import marker from "../../images/Portfolio-marker.svg"

function Portfolio(){
  return(
    <section className="portfolio">
      <h3 className="pottfolio__list_title">Портфолио</h3>
      <ul className="pottfolio__list">
        <li className="pottfolio__list_item">
          <p className="pottfolio__list_item-title">Статичный сайт</p>
          <a href="https://github.com/GochKa/First-project">
            <img className="pottfolio__list_item-marker" src={marker} alt="Стрелочка"></img>
          </a>
        </li>
        <li className="pottfolio__list_item">
        <p className="pottfolio__list_item-title">Адаптивный сайт</p>
        <a href="https://github.com/GochKa/russian-travel">  
          <img className="pottfolio__list_item-marker" src={marker} alt="Стрелочка"></img>
        </a>
        </li>
        <li className="pottfolio__list_item">
        <p className="pottfolio__list_item-title">Одностраничное приложение</p>
        <a href="https://github.com/GochKa/react-mesto-api-full">
          <img className="pottfolio__list_item-marker" src={marker} alt="Стрелочка"></img>
        </a>  
        </li>
      </ul>
    </section>
  )
}

export default Portfolio