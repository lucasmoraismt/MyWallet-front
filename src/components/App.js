import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import "../css/reset.css";
import "../css/styles.css";
import GlobalStyle from "./styles/GlobalStyle";

import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Home from "./home/Home";
import Finance from "./finance/Finance";

export default function App() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/income" exact>
            <Finance type={"in"} />
          </Route>
          <Route path="/expense" exact>
            <Finance type={"out"} />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
