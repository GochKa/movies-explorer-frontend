import { Route, Switch } from "react-router-dom";
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
function App() {

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
      <Route exact path='/'><Main /></Route>
      <Route exact path='/movies'>
        <Movies onMenu={navigationClick}/>
      </Route>
      <Route exact path='/signup'><Register/></Route>
      <Route exact path="/signin"><Login /></Route>
      <Route exact path="/profile">
        <Profile onMenu={navigationClick}/>
      </Route>
      <Route exact path="/saved-movies"><SavedMovies onMenu={navigationClick}/></Route>
      <Route exact path="*"><NotFound /></Route>
    </Switch>
    <Navigation isOpen={isNavigationOpen} onClose={closeNavigation}/>
    </>
  );
}

export default App;