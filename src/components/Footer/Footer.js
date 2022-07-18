import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <ul className="footer__list">
        <li className="footer__list_link">
          <a className="footer__list_link-item" href="https://practicum.yandex.ru/">  
            Яндекс.Практикум
          </a>
        </li>
        <li className="footer__list_link">
          <a className="footer__list_link-item" href="https://github.com/GochKa"> 
          GitHub
          </a>
        </li>
        <li className="footer__list_link">
          <a className="footer__list_link-item" href="https://vk.com/id211041864"> 
          Вконтакте
          </a>
        </li>
      </ul>
      <p className="footer__copyright">&copy; 2022</p>
    </section>
  )
}

export default Footer;