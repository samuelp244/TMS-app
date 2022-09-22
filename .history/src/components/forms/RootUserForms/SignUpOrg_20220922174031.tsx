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
    <div>
    <form onSubmit={submitHandler}>
      <div className="details">
        <h1>Sign Up (Org)</h1>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          required
          onChange={(e: any) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          required
          onChange={(e: any) => {
            setOrganization(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confPassword}
          onChange={(e: any) => {
            setConfPassword(e.target.value);
          }}
        />
        {password !== confPassword ? (
          <small>Didn't match the password</small>
        ) : null}
      </div>
      <button type="submit">Sign Up</button>
      <p>
        already have an account?<Link to="/orglogin">Log In</Link>
      </p>
    </form>
    </div>
    </>
  );
};

export default SignUpOrg;
