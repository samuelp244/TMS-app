import React, { useState } from "react";
import NavBar from "../../NavBar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../../api/apiCalls";

const SignUpOrg = () => {
  const [userName, setUserName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (password === confPassword) {
      Axios.post(`${BASE_URL}/v1/registerRootUser`, {
        username: userName,
        organization: organization,
        email: email,
        password: password,
      }).then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          if (res.data.status === "ok") {
            navigate("/orgdashboard",{
              state:{
                organization:res.data.role,
                username:res.data.username
              }
            });
          }
        }
      });

      setUserName("");
      setOrganization("");
      setEmail("");
      setPassword("");
      setConfPassword("");
    }
  };

  return (
    <>
    <NavBar/>
    <div className="t-0 w-full h-screen flex flex-col justify-center items-center">
    <form onSubmit={submitHandler} className="w-96  bg-slate-400 h-max rounded-md p-10 flex flex-col justify-center items-center">
      <div className="w-56 flex flex-col">
        <h1 className="mb-5 text-3xl text-center text-white font-semibold">Sign Up (Org)</h1>
        <input
        className="mb-5 rounded-md p-1"
          type="text"
          placeholder="Username"
          value={userName}
          required
          onChange={(e: any) => {
            setUserName(e.target.value);
          }}
        />
        <input
        className="mb-5 rounded-md p-1"
          type="text"
          placeholder="Organization"
          value={organization}
          required
          onChange={(e: any) => {
            setOrganization(e.target.value);
          }}
        />
        <input
        className="mb-5 rounded-md p-1"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <input
        className="mb-5 rounded-md p-1"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <input
        className="mb-5 rounded-md p-1"
          type="password"
          placeholder="Confirm Password"
          required
          value={confPassword}
          onChange={(e: any) => {
            setConfPassword(e.target.value);
          }}
        />
        {password !== confPassword ? (
          <small  className="mb-5 text-center text-white">Didn't match the password</small>
        ) : null}
      </div>
      <button type="submit" className="mb-5 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">Sign Up</button>
      <p className="text-sm">
        already have an account?<Link to="/orglogin" className="text-xl text-white hover:underline-offset-1">Log In</Link>
      </p>
    </form>
    </div>
    </>
  );
};

export default SignUpOrg;
