import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/appRouter";
import axios from "axios";
import { UserContext } from "./contexts/user/userContext";

axios.defaults.baseURL = "http://localhost:400";



function App() {

  const { fetchUserData } = useContext(UserContext);


  React.useEffect(() => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        fetchUserData(userToken);
      }
    } catch (e) {
      localStorage.setItem("userToken", "");
    }

  }, []);


  return (

    <BrowserRouter>
      {/* <Navbar /> */}
      <Router />
    </BrowserRouter>

  );
};

export default App;