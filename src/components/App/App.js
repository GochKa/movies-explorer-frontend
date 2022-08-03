import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import React from "react";
import Navigation from "../Navigation/Navigation";
import * as auth from "../../utils/Auth"
import mainApi from "../../utils/MainApi"
import * as moviesApi from "../../utils/MoviesApi"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import {MAX_SHORT_MOVIE_DORATION} from "../../utils/config"
function App() {
  const history = useHistory();
  let location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [message, setMessage] = React.useState("");
  
///////////////////// Логин ///////////////////////////  
//////////////////////////////////////////////////////

  const [loggedIn, setLoggedIn] = React.useState(false);
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          setMessage("Что-то пошло не так");
          return false;
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setMessage("");
          setLoggedIn(true);
          getCurrentUser();
          history.push("/movies");
          return loggedIn;
        }
      })
      .catch((err) => {
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
  }
//////////////////////////////////////////////////////


///////////////////// Регистрация ///////////////////////////  
////////////////////////////////////////////////////////////

function handleRegister(name, email, password) {
  auth
    .register(name, email, password)
    .then((res) => {
      if (res) {
        setMessage("");
        handleLogin(email, password);
        setLoggedIn(true);
        setCurrentUser(res);
      }
    })
    .catch((err) => {
      if (err === 409) {
        setMessage("Пользователь с таким email уже существует");
      } else {
        setMessage("При регистрации пользователя произошла ошибка");
      }
    });
}
////////////////////////////////////////////////////////////


///////////////////// getCurrentUser ///////////////////////////  
///////////////////////////////////////////////////////////////

  function getCurrentUser() {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getUserData(jwt)
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
      });
  }
///////////////////////////////////////////////////////////////

React.useEffect(() => {
  const path = location.pathname;
  const jwt = localStorage.getItem("jwt");
  if (jwt !== null) {
    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          getCurrentUser();
          setCurrentUser(res);
          history.push(path);
        }
      })
      .catch((err) => {
        console.log(`Переданный токен некорректен или просрочек: ${err}`);
        localStorage.removeItem("jwt");
        history.push("/");
      });
  }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  
///////////////////// Получение массива фильмов ///////////////////////////  
//////////////////////////////////////////////////////////////////////////  
const [movies, setMovies] = React.useState([]);
React.useEffect(() => {
  moviesApi
    .getInitialMovies()
    .then((allMovies) => {
      setMovies(allMovies);
      localStorage.setItem("movies", JSON.stringify(allMovies));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      localStorage.removeItem("movies");
    });
}, [currentUser]);
//////////////////////////////////////////////////////////////////////////  
  
///////////////////// Фильтрация фильмов ///////////////////////////  
///////////////////////////////////////////////////////////////////
const [shortMovies, setShortMovies] = React.useState(false);
function filterShortMovies(arr) {
  if (arr.length !== 0 || arr !== "undefind") {
    return arr.filter((movie) =>
      shortMovies ? movie.duration <= MAX_SHORT_MOVIE_DORATION : true
    );
  }
}

///////////////////// Поиск фильма ///////////////////////////  

const [moviesMessage, setMoviesMessage] = React.useState("");
const [userMovies, setUserMovies] = React.useState([]);
const [sortedMovies, setSortedMovies] = React.useState([]);

function handleGetMovies(keyword) {
  setMoviesMessage("");
  const key = new RegExp(keyword, "gi");
  const findedMovies = movies.filter(
    (item) => key.test(item.nameRU) || key.test(item.nameEN)
  );
  if (findedMovies.length === 0) {
    setMoviesMessage("Ничего не найдено");
  } else {
    setMoviesMessage("");
    const checkedLikes = findedMovies.map((movie) => {
      movie.isSaved = userMovies.some(
        (userMovie) => userMovie.movieId === movie.id
        
      );

      return movie;
    });
    setSortedMovies(checkedLikes);
    localStorage.setItem("sortedMovies", JSON.stringify(checkedLikes));
  }
}
//////////////////////////////////////////////////////////////
  

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function handleCheckBox() {
  setShortMovies(!shortMovies);
}
///////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
React.useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  if (jwt !== null) {
    Promise.all([mainApi.getUserData(jwt), mainApi.getUserMovies(jwt)])
      .then(([userData, savedMovies]) => {

        localStorage.setItem("currentUser", JSON.stringify(userData));
        setCurrentUser(userData);

        const savedMoviesList = savedMovies.filter(
          (item) => item.owner._id === userData._id
        );
        localStorage.setItem("userMovies", JSON.stringify(savedMoviesList));
        setUserMovies(savedMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, [loggedIn]);
///////////////////////////////////////////////////////////////////

/////////////////// Изменение профиля ///////////////////
function handleUpdateUser(data) {
  mainApi
    .editUserInfo(data)
    .then((editedData) => {
      setCurrentUser(editedData);
      setMessage("Данные профиля успешно обновлены");
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err.status === 409) {
        setMessage("Пользователь с таким email уже существует");
      } else {
        setMessage("При изменении данных профиля произошла ошибка");
      }
    });
}

/////////////////// Изменение состояния лайка ///////////////////

///////////////////////////////////////////////////////////////////


function handleGetSavedMovies(keyword) {
  setMoviesMessage("");
  const key = new RegExp(keyword, "gi");
  const findedMovies = userMovies.filter(
    (item) => key.test(item.nameRU) || key.test(item.nameEN)
  );
  if (findedMovies.length === 0) {
    setMoviesMessage("Ничего не найдено");
  } else {
    setMoviesMessage("");
    setUserMovies(findedMovies);
  }
}

  const [isNavigationOpen , setNavigationOpen] = React.useState(false)

  const navigationClick = () =>{
    setNavigationOpen(true)
  }

  const closeNavigation = () =>{
    setNavigationOpen()
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <Switch>
      <Route exact path='/'>
        <Main />
      </Route>
      <ProtectedRoute 
        path='/movies'
        component={Movies} 
        onMenu={navigationClick}
        loggedIn={loggedIn}
        movies={filterShortMovies(sortedMovies)}
        onGetMovies={handleGetMovies}
        message={moviesMessage}
        onFilter={handleCheckBox}
        isShortMovie={shortMovies}
        savedMovies={userMovies}
      />
      <Route exact path='/signup'>
        <Register 
        onRegister={handleRegister} 
        message={message}/>
      </Route>
      <Route exact path="/signin">
        <Login 
        onLogin={handleLogin} 
        loggedIn={loggedIn} 
        message={message}/>
      </Route>
      <ProtectedRoute 
        path="/profile" 
        onMenu={navigationClick}
        component={Profile}
        loggedIn={loggedIn}
        message={message}
        onEditUser={handleUpdateUser}
      />
      <ProtectedRoute 
        path="/saved-movies"
        component={SavedMovies}
        onMenu={navigationClick} 
        movies={filterShortMovies(userMovies)}
        onGetMovies={handleGetSavedMovies}
        loggedIn={loggedIn}
        isShortMovie={shortMovies}
        onFilter={handleCheckBox}
        message={moviesMessage}
        isSavedMovies={true}
      />
      <Route exact path="*"><NotFound /></Route>
    </Switch>
    <Navigation isOpen={isNavigationOpen} onClose={closeNavigation}/>
    </CurrentUserContext.Provider>
  );
}

export default App;