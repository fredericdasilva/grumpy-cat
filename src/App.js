import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { router as Route } from "./pages/router";
import { Nav } from "./components/Header/Nav";

const App = () => {
  return (
    <Router>
      <Nav />
      {/* Route is located at pages folder */}
      <Route />
    </Router>
  );
};

export default App;
