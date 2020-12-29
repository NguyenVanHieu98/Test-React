import React, { Component } from "react";
import "./App.css";
import Homepage from './components/Homepage/Homepage';
import Default from "./components/Default/Default";
import verifyPage from './components/SendNote/verifyPage/verifyPage';
import ShowNote from './components/SendNote/ShowNote/ShowNote';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminPage from './components/AdminPage/AdminPage';
import DataProcessing from './components/Layout/DataProcessing';
import ViewPage from './components/User/ViewPage';
import ViewAllHotel from "./components/User/ViewAllHotel";

class App extends Component {

  handleExtendEvent = (check) => {
    if (check === 1){
      document.getElementById("folder-box").style.display = "none"
      document.getElementById("note-box-main").setAttribute("class", "col-100vh col-md-12")
    } else {
      document.getElementById("folder-box").style.display = "block"
      document.getElementById("note-box-main").setAttribute("class", "col-100vh col-md-9")
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={AdminPage} />
          <Route path="/home" exact component={Homepage} />
          <Route path="/verify/:shareID" component={verifyPage} />
          <Route path="/showNote/:shareID" component={ShowNote} />
          <Route path="/data-processing" exact component={DataProcessing} />
          <Route path="/detail/:hotelName" exact component={ViewPage} />
          <Route path="/user" exact component={ViewAllHotel} />
          <Route component={Default} />
        </Switch>
      </BrowserRouter>
    )
  }
}



export default App;
