import { useState, useContext, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./container/welcome";
import SignUpPage from "./container/sign-up";
import SignInPage from "./container/sign-in";
import Confirm from "./container/signup-confirm";
import RecoveryPage from "./container/recovery";
import RecoveryConfirmPage from "./container/recovery-confirm"
import BalancePage from "./container/balance";


const AuthContext = createContext<boolean | null>(null);

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {	
	const isLogged = useContext(AuthContext)
	return isLogged ? <>{children}</> : <WelcomePage/>
};

const AuthRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
	const isLogged = useContext(AuthContext) 
	return isLogged ? <BalancePage children/> : <>{children}</> 
}; 


function App() {

  const [isLogged, setIsLogged] = useState<boolean | null>(null);

	useEffect(() => {
		const sessionAuthString = window.localStorage.sessionAuth;

		try {
			const sessionAuthObject = JSON.parse(sessionAuthString);
			const isConfirm = sessionAuthObject.user.isConfirm;
			setIsLogged(isConfirm);
		} catch (error) {
			console.error('Error parsing JSON:', error);
		}
	  }, []);

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

        <Route path="/signup-confirm"
         element={
          <AuthRoute>
            <Confirm children/>
          </AuthRoute>
        }/>

        <Route path="/signin"
         element={
          <AuthRoute>
            <SignInPage children/>
          </AuthRoute>
        }/>

        <Route path="/recovery"
         element={
          <AuthRoute>
            <RecoveryPage children/>
          </AuthRoute>
        }/>

        <Route path="/recovery-confirm"
         element={
          <AuthRoute>
            <RecoveryConfirmPage children/>
          </AuthRoute>
        }/>

         <Route path="/balance"
         element={
           <PrivateRoute>
             <BalancePage children/>
           </PrivateRoute>
         }
         />

      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
