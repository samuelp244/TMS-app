import React, { useState } from "react";
import NavBar from "../../NavBar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../../api/apiCalls";

const SignUpComm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (password === confPassword) {
      console.log("passed");
      Axios.post(`${BASE_URL}/v1/registerCustomer`, {
        username: userName,
        email: email,
        phone: phone,
        password: password,
      }).then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          if (res.data.status === "ok") {
            navigate("/login");
          }
        }
      });

      setUserName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfPassword("");
    } else {
      console.log("failed");
    }
  };

  return (
    <>
    <NavBar/>
    <div className="t-0 w-full h-screen flex flex-col justify-center items-center">
      <form onSubmit={submitHandler}className="t-0 w-full h-screen flex flex-col justify-center items-center">
        <div className="w-56 flex flex-col">
          <h1 className="mb-5 text-3xl text-center text-white font-semibold">Sign Up (Individual)</h1>
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
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mb-5 rounded-md p-1"
            type="text"
            placeholder="Enter your mobile number"
            required
            value={phone}
            onChange={(e: any) => {
              setPhone(e.target.value);
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
            <small className="mb-5 text-center text-white">Didn't match the password</small>
          ) : null}
        </div>
        <button type="submit" className="mb-5 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">Sign Up</button>
        <p className="text-sm">
          already have an account?<Link to="/login" className="text-xl text-white hover:underline-offset-1">Log In</Link>
        </p>
      </form>
    </div>
    </>
  );
};

export default SignUpComm;
