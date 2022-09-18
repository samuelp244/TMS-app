import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CommDashBoard from './components/DashBoards/CommDashBoard';
import OrgDashboard from './components/DashBoards/OrgDashboard';
import OrgUserDashBoard from './components/DashBoards/OrgUserDashBoard'
// import Footer from './components/Footer';
import LogIn from './components/forms/CustomerForms/LogInComm';
import SignUp from './components/forms/CustomerForms/SignUpComm';
import LogInOrg from './components/forms/RootUserForms/LogInOrg';
import SignUpOrg from './components/forms/RootUserForms/SignUpOrg';
import MainPage from './components/MainPage';
import About from './components/About';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import { ProtectedRoute } from './components/forms/CustomerForms/ProtectedRoute';

function App() {
  const [userLoggedIn,setUserLoggedIn] = useState(false);

  useEffect(()=>{
    localStorage.setItem("userLoggedIn",JSON.stringify(userLoggedIn))
  },[userLoggedIn])

  const loggedIn = async() => {
    await setUserLoggedIn(true);
  };
  const loggedOut = () => setUserLoggedIn(false)
  return (
    <div className="">
      <Router>
        <NavBar/>
        <Routes>
          {/* public */}
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<LogIn loggedIn={loggedIn} />}></Route>
          <Route path="/orglogin" element={<LogInOrg loggedIn={loggedIn}/>}></Route>
          <Route path="/orgsignup" element={<SignUpOrg/>}></Route>
          {/* Protected */}
          {/* <Route element={<ProtectedRoute/>}> */}
            <Route path="/commdashboard" element={<CommDashBoard loggedOut={loggedOut}/>}></Route>
          {/* </Route> */}
          <Route path="/orgdashboard" element={<OrgDashboard loggedOut={loggedOut}/>}></Route>
          <Route path="/orguserdb" element={<OrgUserDashBoard loggedOut={loggedOut}/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;