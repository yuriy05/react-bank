import { useReducer, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./container/welcome";
import SignUpPage from "./container/sign-up";
import SignInPage from "./container/sign-in";
import AuthRoute from "./container/auth";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index
         element={
          <AuthRoute>
            <WelcomePage />
          </AuthRoute>
        }/>
        <Route path="/signup"
         element={
          <AuthRoute>
            <SignUpPage />
          </AuthRoute>
        }/>
        <Route path="/signin"
         element={
          <AuthRoute>
            <SignInPage />
          </AuthRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
