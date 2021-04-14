import React from "react";
// Components and pages
import Home from "./pages/Home";
import GlobalStyles from "./components/GlobalStyle";
import { Route, Redirect } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Route path={["/game/:id", "/"]}>
        <Home />
      </Route>
      <Redirect to="/" />
    </div>
  );
};

export default App;
