import React from "react";
import "../More/More.css";

function More(props) {
  return (
    <section className="more">
			<button type="button" className="more__button" onClick={props.showMoreMovies}>Ещё</button>
    </section>
  );
}

export default More;