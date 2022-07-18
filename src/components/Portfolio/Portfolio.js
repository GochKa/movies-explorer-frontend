import React from "react";
import "./Portfolio.css"
import photo from "../../images/Portfolio.svg"
import marker from "../../images/Portfolio-marker.svg"

function Portfolio(){
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Студент</h2>
      <img className="portfolio__img" src={photo} alt="Фото портфолио"></img>
      <h2 className="portfolio__name">Георгий</h2>
      <p className="portfolio__subtitle">Фронтенд-разработчик, 22 года</p>
      <p className="portfolio__subtitle">Я живу в городе Рязани. Закончил факультет Автоматики и информационных технологий в управлении РГРТУ.
       Активно ищу работу и после прохождения курса хочу переехать в Санкт-Петербург.</p>
      <ul className="pottfolio__social">
        <li className="pottfolio__social_item">
          <a className="pottfolio__social_item-link" href="https://vk.com/id211041864">Вконтакте</a>
        </li>
        <li className="pottfolio__social_item">
        <a className="pottfolio__social_item-link" href="https://github.com/GochKa">GitHub</a>
        </li>
      </ul>
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