import React from "react";
import "./SearchForm.css";
import sbmbutton from "../../images/find_form.svg"
import sbmbutton_dis from "../../images/find_disable.svg"
function SearchForm(props){
  const [findedMovie, setFindedMovie] = React.useState("");
  const [error, setError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  const [inputValue, setInputValue] = React.useState()

  function handleSearchMovie(e) {
    setFindedMovie(e.target.value);
    setInputValue(localStorage.setItem("inputValue", e.target.value))
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
          value={localStorage.getItem("inputValue") || ""}
          />
      <button type="submit" className="searchform__submit"             
            onClick={handleSubmit}
            >
        <img src={localStorage.getItem("inputValue") ? sbmbutton : sbmbutton_dis} alt="кнопка формы"/>
      </button>
    </form>
    {!localStorage.getItem("inputValue") ?
    (<span id="searchform-input-err" className="searchform-item-err">{error}</span>) : ("")}
    
    </section>
  )

}

export default SearchForm;