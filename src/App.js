import { useEffect, useRef, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import MainLoading from "./Components/MainLoading";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountRecovery from "./pages/auth/AccountRecovery";
import Home from "./pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { setisAuth, setisAuthFalse, updateUserInfo } from "./Redux/userSlice";
import axios from "./axios";
import MService from "./Components/Service/MService";
import SubService from "./Components/Service/SubService";
import BookService from "./Components/Service/BookService";
import ShowAllBookings from "./Components/Booking/ShowAllBookings";
import ShowBooking from "./Components/Booking/ShowBooking";
import Signout from "./pages/auth/Signout";
import Profile from "./pages/auth/Profile";
import ProfileEdit from "./pages/auth/ProfileEdit";
const config = require("./config.json");

function App() {
  const [Loading, setLoading] = useState(true);
  const [updateuser, setupdateuser] = useState(false);
  const globaluser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMounted = useRef();

  const checkLogin = (token) => {
    axios
      .get(config.api_user, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        if (res.data.id) {
          console.log("token->", token);
          console.log("data->", res.data);

          dispatch(
            updateUserInfo({
              id: res.data.id,
              phone: res.data.phone,
              first_login: res.data.first_login,
            })
          );
          dispatch(setisAuth());
          console.log("isAuth e", globaluser);
          setupdateuser(true);
          setLoading(false);
        } else {
          setLoading(false);
          dispatch(
            setisAuthFalse({
              status: true,
              detail: "Please check Mobile no. and password",
            })
          );
        }
      })
      .catch((error) => {
        console.log("error->", error);
        setLoading(false);
        dispatch(
          setisAuthFalse({
            status: true,
            detail: "Techincal Failure, Please try again",
          })
        );
      });
  };

  useEffect(() => {
    if (isMounted.current) return;

    const token = localStorage.getItem("token");

    if (token) {
      checkLogin(token);
    } else {
      setLoading(false);
      console.log("no token found");
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setLoading(false);

    isMounted.current = true;
  }, []);

  useEffect(() => {
    console.log("isAuth e2", globaluser);
  }, [updateuser]);

  return (
    <div>
      {Loading ? (
        <MainLoading />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accountRecovery" element={<AccountRecovery />} />
          <Route path="/mservice/:mainID" element={<RequireAuth><MService /></RequireAuth>} />
          <Route path="/mservice/service/:subID" element={<RequireAuth><SubService /></RequireAuth>} />
          <Route path="/mservice/service/booking/:subID" element={<RequireAuth><BookService /></RequireAuth>} />
          <Route path="/booking" element={<RequireAuth><ShowAllBookings /></RequireAuth>} />
          <Route path="/booking/:BookId" element={<RequireAuth><ShowBooking /></RequireAuth>} />
          <Route path="/signout" element={<RequireAuth><Signout /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/edit/profile" element={<RequireAuth><ProfileEdit /></RequireAuth>} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      )}
    </div>
  );

  function RequireAuth({ children }) {
    if (!globaluser.isAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  }
}

export default App;
