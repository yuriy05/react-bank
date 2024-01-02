import { useReducer, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./container/welcome";
import AuthRoute from "./container/auth";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <AuthRoute>
            <WelcomePage />
          </AuthRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
