import React, { useState } from "react";

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
    <form onSubmit={submitHandler}>
      <div className="details">
        <h1>Log In (Org)</h1>
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
        <small>forgot password?</small>
      </div>
      <button>Log In</button>
      <p>
        Don't have an account?<Link to="/orgsignup">Sign Up</Link>
      </p>
    </form>
    </>
  );
};

export default LogInOrg;
