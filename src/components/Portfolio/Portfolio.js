import React from "react";
import "./Portfolio.css"

import marker from "../../images/Portfolio-marker.svg"

function Portfolio(){
  return(
    <section className="portfolio">
      <h3 className="pottfolio__list_title">Портфолио</h3>
      <ul className="pottfolio__list">
        <li className="pottfolio__list_item">
          <div className="pottfolio__list_item-block">
            <a target="blank" href="https://github.com/GochKa/First-project" className="pottfolio__list_item-link">
              <p className="pottfolio__list_item-title">Статичный сайт</p>
            </a>
            <a target="blank" href="https://github.com/GochKa/First-project" className="pottfolio__list_item-link">
              <img className="pottfolio__list_item-marker" src={marker} alt="Стрелочка"></img>
            </a>
          </div> 
        </li>
        <li className="pottfolio__list_item">
        <div className="pottfolio__list_item-block">
          <a target="blank" href="https://github.com/GochKa/russian-travel" className="pottfolio__list_item-link">
            <p className="pottfolio__list_item-title">Адаптивный сайт</p>
          </a>
          <a target="blank" href="https://github.com/GochKa/russian-travel" className="pottfolio__list_item-link">  
            <img className="pottfolio__list_item-marker" src={marker} alt="Стрелочка" ></img>
          </a>
        </div>
        </li>
        <li className="pottfolio__list_item">
        <div className="pottfolio__list_item-block">
          <a target="blank" href="https://github.com/GochKa/react-mesto-api-full" className="pottfolio__list_item-link">
           <p className="pottfolio__list_item-title">Одностраничное приложение</p>
          </a>
          <a target="blank" href="https://github.com/GochKa/react-mesto-api-full" className="pottfolio__list_item-link">
            <img className="pottfolio__list_item-marker" src={marker} alt="Стрелочка"></img>
          </a>  
        </div>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio