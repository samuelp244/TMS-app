import React, { useState } from "react";
import 
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../../api/apiCalls";

interface loginProps {
  loggedIn: () => void;
}

const LogInComm = (props: loginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();

    Axios.post(`${BASE_URL}/v1/loginUser`, {
      email: email,
      password: password,
    }).then(async (res) => {
      console.log(res);
      if (res.statusText === "OK") {
        if (res.data.status === "ok" && res.data.user === true) {
          // console.log("hi")
          if (res.data.role === "customer") {
            await props.loggedIn();
            navigate("/commdashboard", {
              state: {
                username: res.data.username,
              },
              replace: true,
            });
          }

          if (res.data.role === "employee") {
            await props.loggedIn();
            navigate("/orguserdb", {
              state: {
                username: res.data.username,
              },
            });
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
    <div className="t-0 w-full h-screen flex flex-col justify-center items-center">
      <form onSubmit={submitHandler} className="w-96  bg-slate-400 h-max rounded-md p-10 flex flex-col justify-center items-center">
        <div className="w-56 flex flex-col">
          <h1 className="mb-5 text-3xl text-center text-white font-semibold ">Log In (Individual)</h1>
          <input
            className="mb-5 rounded-md p-1"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mb-5 rounded-md p-1"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          
        </div>
        <button className="mb-10 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">Log In</button>
        <small className="mb-5 text-center text-white hover:text-slate-600 ">forgot password?</small>
        <p className="text-sm">
          Don't have an account? <Link to="/signup" className="text-xl text-white hover:underline-offset-1">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LogInComm;
