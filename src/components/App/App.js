import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import React from "react";
import './App.css';

import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Navigation from "../Navigation/Navigation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import CurrentUserContext from "../../context/CurrentUserContext"

import mainApi from "../../utils/MainApi"
import * as auth from "../../utils/Auth"
import * as moviesApi from "../../utils/MoviesApi"
import {MAX_SHORT_MOVIE_DORATION} from "../../utils/config"

function App() {
  const history = useHistory();
  let location = useLocation();

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



///////////////////////CurrentUser с useEffect////////////////////////////////
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userMovies, setUserMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

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
////////////////////////////////////////////////////////////////////////

///////////////////////Регистрация и логин//////////////////////////////
const [message, setMessage] = React.useState("");
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
/////////////////////////////////////////////////////////////////


/////////////////Открытие меню навигации//////////////////
  const [isNavigationOpen , setNavigationOpen] = React.useState(false)
  const navigationClick = () =>{
    setNavigationOpen(true)
  }
  const closeNavigation = () =>{
    setNavigationOpen()
  }
///////////////////////////////////////////////////////  


/////////////////Редактирование профиля//////////////////
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
////////////////////////////////////////////////////////

/////////////////////// Фильмы ////////////////////////// 
const [moviesMessage, setMoviesMessage] = React.useState("");
const [movies, setMovies] = React.useState([]);
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
////////////////////////////////////////////////////////

///////////////////////////// Фильтр фильмов /////////////////////////
const [shortMovies, setShortMovies] = React.useState(false);
function filterShortMovies(arr) {
  if (arr.length !== 0 || arr !== "undefind") {
    return arr.filter((movie) =>
      shortMovies ? movie.duration <= MAX_SHORT_MOVIE_DORATION : true
    );
  }
}
///////////////////////////////////////////////////////////////////
 
///////////////////////////// CheckBox /////////////////////////
function handleCheckBox() {
  setShortMovies(!shortMovies);
}
/////////////////////////////////////////////////////////////

/////////////////////////// Получение массива фильмов ///////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// Сохранение фильмов ///////////////////////////////////////

function handleLikeChange(movie) {
  const clickedMovie = movie.isSaved;
  if (clickedMovie) {
    handleDislikeClick(movie);
  } else {
    handleLikeClick(movie);
  }
}

function handleLikeClick(movie) {
  const jwt = localStorage.getItem("jwt");
  mainApi
    .addMovie(movie, jwt)
    .then((newMovie) => {
      if (!newMovie) {
        throw new Error("При добавлении фильма произошла ошибка");
      } else {
        localStorage.setItem(
          "userMovies",
          JSON.stringify((newMovie = [newMovie.movie, ...userMovies]))
        );
        setUserMovies(newMovie);
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function handleDislikeClick(movie) {
  const jwt = localStorage.getItem("jwt");
  const movieId = movie.id || movie.movieId;
  const selectedMovie = userMovies.find((item) => item.movieId === movieId);
  mainApi
    .deleteMovie(selectedMovie._id, jwt)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        throw new Error("При удалении фильма произошла ошибка");
      } else {
        const newMoviesList = userMovies.filter((c) => c.movieId !== movieId);
        setUserMovies(newMoviesList);
      }
    })
    .catch((err) => console.log(`При удалении фильма: ${err}`));
}

function handleMovieDeleteButton(movie) {
  handleDislikeClick(movie);
}

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

function checkSavedMovie(movie) {
  return (movie.isSaved = userMovies.some(
    (userMovie) => userMovie.movieId === movie.id
  ));
}

React.useEffect(() => {
  checkSavedMovie(sortedMovies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userMovies]);

///////////////////////////////////////////////////////////////////////
return (
    <CurrentUserContext.Provider value={currentUser}>
    <Switch>
      <Route exact path='/'>
        <Main/>
      </Route>

      <ProtectedRoute  
          path='/movies'
          component={Movies} 
          onMenu={navigationClick}
          loggedIn={loggedIn}
          onGetMovies={handleGetMovies}
          message={moviesMessage}
          movies={filterShortMovies(sortedMovies)}
          onFilter={handleCheckBox}
          isShortMovie={shortMovies}
          savedMovies={userMovies}
          onAddMovie={handleLikeChange}
          likedMovies={checkSavedMovie}
          >
      </ProtectedRoute>   

      <Route  path='/signup'>
        <Register onRegister={handleRegister} message={message}/>
      </Route>
      <Route  path="/signin">
        <Login onLogin={handleLogin} loggedIn={loggedIn} message={message} />
      </Route>

      <ProtectedRoute  
          path="/profile"
          onMenu={navigationClick}
          component={Profile}
          loggedIn={loggedIn}
          onEditUser={handleUpdateUser}
          message={message}
          >
      </ProtectedRoute >

      <ProtectedRoute 
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          isShortMovie={shortMovies}
          onFilter={handleCheckBox}
          message={moviesMessage}
          isSavedMovies={true}
          movies={filterShortMovies(userMovies)}
          onDelete={handleMovieDeleteButton}
          onMenu={navigationClick}
          onGetMovies={handleGetSavedMovies}
          >
      </ProtectedRoute>

      <Route exact path="*">
        <NotFound/>
      </Route>
    </Switch>
    <Navigation isOpen={isNavigationOpen} onClose={closeNavigation}/>
    </CurrentUserContext.Provider>
  );
}

export default App;