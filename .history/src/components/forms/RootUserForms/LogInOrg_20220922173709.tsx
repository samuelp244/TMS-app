import React, { useState } from "react";
import NavBar from "../../NavBar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../../api/apiCalls";

interface loginProps{
  loggedIn:()=>void;
}


const LogInOrg = (props:loginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();

    Axios.post(`${BASE_URL}/v1/loginUser`, {
      email: email,
      password: password,
    }).then((res) => {
      console.log(res.data);
      if (res.data.status === "ok") {
        if (res.data.role === "rootUser") {
          props.loggedIn();
          navigate("/orgdashboard",{
            state:{
              username:res.data.username,
            }
          });
        } else {
          navigate("/");
        }
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <>
    <NavBar/>
    <div className="t-0 w-full h-screen flex flex-col justify-center items-center">
    <form onSubmit={submitHandler} className="w-96  bg-slate-400 h-max rounded-md p-10 flex flex-col justify-center items-center">
      <div className="w-56 flex flex-col">
        <h1 className="mb-5 text-3xl text-center text-white font-semibold ">Log In (Org)</h1>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        
      </div>
      <button>Log In</button>
      <small  className="mb-5 text-center text-white hover:text-slate-600 ">forgot password?</small>
      <p>
        Don't have an account?<Link to="/orgsignup">Sign Up</Link>
      </p>
    </form>
    </div>
    </>
  );
};

export default LogInOrg;
