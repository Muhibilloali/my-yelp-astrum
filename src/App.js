import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  let auth = getAuth();

  const [userName, setUserName] = useState('')

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return findOut;
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            isLogged ? (
              <Navigate to={"/"} replace />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/register"
          element={
            isLogged ? (
              <Navigate to={"/"} replace />
            ) : (
              <Register />
            )
          }
        ></Route>
        <Route path="/" element={isLogged ? <Main userName={userName} /> : <Navigate to={'/login'} replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
