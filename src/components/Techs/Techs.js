import React from "react";
import "./Techs.css"
function Techs() {
  return(
    <section className="techs">
      <h1 className="techs__title">Технологии</h1>
      <h2 className="techs__subtitle">7 технологий</h2>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__grid">
        <p className="techs__grid_item">HTML</p>
        <p className="techs__grid_item">CSS</p>
        <p className="techs__grid_item">JS</p>
        <p className="techs__grid_item">React</p>
        <p className="techs__grid_item">Git</p>
        <p className="techs__grid_item">Express.js</p>
        <p className="techs__grid_item">mongoDB</p>
      </ul>
    </section>
  )
}

export default Techs;