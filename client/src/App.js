import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MarketPlace from "./components/marketPlace";
import SuccessPage from "./components/success";
import FailurePage from "./components/failure";

function App() {
  return (
    <Router basename={process.env.REACT_APP_SUBDIRECTORY}>
      <Switch>
        <Route path="/success">
          <SuccessPage />
        </Route>
        <Route path="/failure">
          <FailurePage />
        </Route>
        <Route path="/">
          <MarketPlace />
        </Route>
      </Switch>      
    </Router>    
  );
}

export default App;
