import React from "react";
import "./SearchForm.css";
import sbmbutton from "../../images/find_form.svg"
function SearchForm(props){
  const [findedMovie, setFindedMovie] = React.useState("");
  const [error, setError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  function handleSearchMovie(e) {
    setFindedMovie(e.target.value);
    if (e.target.value.length === 0) {
      setError("Нужно ввести ключевое слово");
    } else {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formValid) {
      setError("");
      props.onGetMovies(findedMovie);
    } else {
      setError("Нужно ввести ключевое слово")
    }

  }

  React.useEffect(() => {
    if (findedMovie && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [findedMovie, error]);


  return(
    <section>
    <form className="searchform" onSubmit={handleSubmit}>
      <input className="searchform__input" 
          placeholder="Фильм" 
          required 
          name="search"
          minLength="2"
          maxLength="40"
          onChange={handleSearchMovie}
          value={findedMovie}
          />
      <button type="submit" className="searchform__submit"             
            onClick={handleSubmit}
            >
        <img src={sbmbutton} alt="кнопка формы"/>
      </button>
    </form>
    {!findedMovie ?
    (<span id="searchform-input-err" className="searchform-item-err">{error}</span>) : ("")}
    
    </section>
  )

}

export default SearchForm;