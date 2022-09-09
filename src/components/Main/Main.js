import React from "react";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs"
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";
import HeaderAfterAuth from "../HeaderAfterAuth/HeaderAfterAuth";
import Navigation from "../Navigation/Navigation";

function Main(props){
  return(
    <>
    {props.loggedIn ? (
      <HeaderAfterAuth openMenu={props.onMenu} clsoeMenu={props.onClose} isOpen={props.isOpen}/>
    ) : (<Header/>)}
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Navigation isOpen={props.isOpen} closeMenu={props.onClose}/>
      </main>
      <Footer />
    </>
  )
}

export default Main