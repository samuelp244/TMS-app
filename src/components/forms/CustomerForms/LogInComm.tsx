import React, { useState } from "react";
import "./LoginComm.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../../api/apiCalls";

interface loginProps{
  loggedIn:()=>Promise<any>;
}

const LogInComm = (props:loginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();

    Axios.post(`${BASE_URL}/v1/loginUser`, {
      email: email,
      password: password,
    }).then(async(res) => {
      
      if (res.statusText === "OK") {

        if (res.data.status === "ok" && res.data.user === true) {
          
          // console.log("hi")
          if(res.data.role === "customer"){
            await props.loggedIn();
            navigate("/commdashboard",{
            state:{
              username:res.data.username,
            },
            replace: true 
          })
          }

          if(res.data.role === "employee"){
            await props.loggedIn();
            navigate("/orguserdb",{
            state:{
              username:res.data.username,
            }
          })

          }
          
        } else {
          alert("Login failed! check password");
        }
      } else {
        console.log("invalid");
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="details">
        <h1>Log In (User)</h1>
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
        Don't have an account?<Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
};

export default LogInComm;
