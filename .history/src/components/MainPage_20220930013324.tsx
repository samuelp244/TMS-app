import React from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";

// import { ReactSVG } from "react";


const MainPage = () => {
  
  return (
    <div className="w-full h-screen text-white flex flex-col text-4xl justify-between items-center">
      {/* <NavBar /> */}
      <NavBar/>

      
      <div className=" bg-slate-400 mt-40 m-5 w-1/2 h-72 text-center align-middle rounded-md flex justify-center items-center">
        
        <Link to="/login">Individual LogIn</Link>
      </div>
      <div className=" bg-slate-400 m-5 mt-2 w-1/2 h-72 text-center align-middle rounded-md flex justify-center items-center">
        <Link to="/orglogin">Organization Login</Link>
        
      </div>
      
    </div>
  );
};

export default MainPage;
