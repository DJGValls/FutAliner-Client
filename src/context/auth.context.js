import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { BallTriangle } from "react-loading-icons";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
      console.log(error);
    }
  };
  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUser,
  };

  if (isFetching) {
    return (
      <div className="App">
        <div className="m-0 vh-100 row justify-content-center align-items-center">
          <div className="col-auto text-center">
            <BallTriangle stroke="#ffc000" strokeWidth={10} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
