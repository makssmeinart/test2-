import React from "react";
import { Header } from "./components";
import "styles/global.css";
import { Main } from "./pages/Main"

export const App = () => {

  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};
