import React from "react";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs"
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";

function Main(){
  return(
    <>
      <Header />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main