import React from "react";
import "./AboutProject.css"

function AboutProject(){
  return(
    <section className="about-project">
      <div className="about-project__info">
        <h2 className="about-project__title">
          О проекте
          </h2>
        <h2 className="about-project__stage">
          Дипломный проект включал 5 этапов
          </h2>
        <p className="about-project__stage_info">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        <h2 className="about-project__time">
          На выполнение диплома ушло 5 недель
          </h2>
        <h2 className="about-project__time_info">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </h2>
      </div>
      <div className="about-project__grid">
        <div className="about-project__grid_item">1 неделя</div>
        <div className="about-project__grid_item">4 недели</div>
        <p className="about-project__grid_text">Back-end</p>
        <p className="about-project__grid_text">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;