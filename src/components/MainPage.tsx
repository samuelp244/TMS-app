import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./MainPage.css";
import { ReactSVG } from "react";


const MainPage = () => {
  
  return (
    <div className="main-page">
      {/* <NavBar /> */}
      <div className="content"></div>
      <div className="content-div">
        
        <Link to="/login">Individual LogIn</Link>
      </div>
      <div className="content-div">
        <Link to="/orglogin">Organization Login</Link>
        
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
