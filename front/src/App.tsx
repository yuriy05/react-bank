import { useState, useContext, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./container/welcome";
import SignUpPage from "./container/sign-up";
import SignInPage from "./container/sign-in";
import Confirm from "./container/confirm";
import AuthRoute from "./container/auth";

const AuthContext = createContext<boolean | null>(null);

// const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
//   const isLogged = useContext(AuthContext)
//   return isLogged ? <>{children}</> : <WelcomePage/>
// }

// const AuthRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
//   const isLogged = useContext(AuthContext)
// } 


function App() {

  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const sessionAuthString = window.localStorage.sessionAuth;

    try {
      const sessionAuthObject = JSON.parse(sessionAuthString);
      const isConfirm = sessionAuthObject.user.isConfirm;
      setIsLogged(isConfirm);
    } catch(e) {
      console.error("Error to parse JSON data", e)
    }
  }, [])

  return (

  <AuthContext.Provider value={isLogged}>
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
            <SignUpPage children/>
          </AuthRoute>
        }/>
        <Route path="/confirm"
         element={
          <AuthRoute>
            <Confirm children/>
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
    </AuthContext.Provider>
  )
}

export default App;
