import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";


function UserProfile() {
  const navigate = useNavigate;
  const {isLoggedIn, loggedUser} = useContext(AuthContext);

  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
      console.log(error);
    }
  };

  if (isFetching) {
    return <BallTriangle />;
  }

  return isLoggedIn ? (
    <div>
      <h1>UserProfile</h1>
    </div>
  ) : (
    <Navigate to={"/login"}></Navigate>
  )
}

export default UserProfile;
