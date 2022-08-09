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
          >
      </ProtectedRoute >

      <ProtectedRoute 
          path="/saved-movies"
          component={SavedMovies}
          onMenu={navigationClick}
          loggedIn={loggedIn}
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