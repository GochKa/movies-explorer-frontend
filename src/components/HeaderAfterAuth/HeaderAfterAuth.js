import React from 'react';
import "./HeaderAfterAuth.css";
import NavTab from "../NavTab/NavTab"

function HeaderAfterAuth(props){
  return(
      <section className='header__auth'>
        <NavTab onClick={props.openMenu}/>
      </section>
    )
}

export default HeaderAfterAuth