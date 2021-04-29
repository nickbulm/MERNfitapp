import React from "react";
//import { Provider } from "react-redux";
//import { configureStore } from "./redux/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import logo from './logo.svg';
import './App.css';

//const store = configureStore();

function App() {
  return (
    //<Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    //</Provider>
  );
}

export default App;
