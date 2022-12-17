import React, {useContext,useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter';
import {Context} from "./index"
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar";

const App = observer(() => {


  return (
      <BrowserRouter>
        <NavBar />
          <AppRouter />
      </BrowserRouter>
  ); 
}); 

export default App;