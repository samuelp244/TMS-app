import React from "react";
import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import NavBar from "./NavBar";

// import { ReactSVG } from "react";


const MainPage = () => {
  
  return (
    <div className="w-full h-full text-white flex flex-col text-4xl justify-between items-center">
      {/* <NavBar /> */}
      

      
      <div className=" bg-slate-400 mt-20 m-5 w-1/2 h-60 text-center align-middle rounded-md flex justify-center items-center">
        
        <Link to="/login">Individual LogIn</Link>
      </div>
      <div className=" bg-slate-400 m-5 mt-2 w-1/2 h-60 text-center align-middle rounded-md flex justify-center items-center">
        <Link to="/orglogin">Organization Login</Link>
        
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
