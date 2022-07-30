import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import React, {useState, useEffect} from "react";
import Navigation from "../Navigation/Navigation";
import * as auth from "../../utils/auth"

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
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

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setMessage("");
          handleLogin(email, password);
          setLoggedIn(true);
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

  const [isNavigationOpen , setNavigationOpen] = React.useState(false)

  const navigationClick = () =>{
    setNavigationOpen(true)
  }

  const closeNavigation = () =>{
    setNavigationOpen()
  }
  return (
    <>
    <Switch>
      <Route exact path='/'>
        <Main />
      </Route>
      <Route exact path='/movies'>
        <Movies onMenu={navigationClick}/>
      </Route>
      <Route exact path='/signup'>
        <Register onRegister={handleRegister} message={message}/>
      </Route>
      <Route exact path="/signin">
        <Login onLogin={handleLogin} loggedIn={loggedIn} message={message}/></Route>
      <Route exact path="/profile">
        <Profile onMenu={navigationClick}/>
      </Route>
      <Route exact path="/saved-movies">
        <SavedMovies onMenu={navigationClick}/>
      </Route>
      <Route exact path="*">
        <NotFound />
      </Route>
    </Switch>
    <Navigation isOpen={isNavigationOpen} onClose={closeNavigation}/>
    </>
  );
}

export default App;