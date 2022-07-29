import React from "react";
import "./AboutMe.css"
import photo from "../../images/Portfolio.svg"

function AboutMe(){
  return(
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__grid">
      <img className="aboutme__img" src={photo} alt="Фото портфолио"></img>
      <div className="aboutme__info">
      <h2 className="aboutme__name">Георгий</h2>
      <p className="aboutme__subtitle">Фронтенд-разработчик, 22 года</p>
      <p className="aboutme__subtitle">Я живу в городе Рязани. Закончил факультет Автоматики и информационных технологий в управлении РГРТУ.
       Активно ищу работу и после прохождения курса хочу переехать в Санкт-Петербург.</p>

      <ul className="aboutme__social">
        <li className="aboutme__social_item">
          <a className="aboutme__social_item-link" href="https://vk.com/id211041864">Вконтакте</a>
        </li>
        <li className="aboutme__social_item">
        <a className="aboutme__social_item-link" href="https://github.com/GochKa">GitHub</a>
        </li>
      </ul>
      </div>
       </div>
    </section>
  )
}

export default AboutMe;