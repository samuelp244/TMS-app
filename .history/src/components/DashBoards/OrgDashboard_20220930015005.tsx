import { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";

import {CgProfile} from "react-icons/cg"
import {AiOutlineSetting} from "react-icons/ai"
import { BASE_URL } from "../../api/apiCalls";


export interface locationState{
  state:{
    username:string,
  }
}

export interface empListType{
  assignedDomain: string,
  email: string,
  username: string,
  _id: string
}

export interface ticketstate{
  category:string,
  organizationName: string,
  publishedAt: string,
  query: string,
  status: string,
  username: string,
  _id: string,
}

interface dashboardProps{
  loggedOut:()=>void
}

const OrgDashboard = (props:dashboardProps) => {
  const [userName, setUserName] = useState("");
  const [dom, setDom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [tickets,setTickets] = useState<ticketstate[]>();

 
  const location = useLocation() as locationState;
 

  const [addUser, setAddUser] = useState(false);
  const [empList,setEmpList]  = useState<empListType[]>();

  const startAdding = () => {
    setAddUser(true);
  };
  const stopAdding = () => {
    setAddUser(false);
  };

  const navigate = useNavigate();
  useEffect(()=>{
    if(location.state === null) navigate("/login")
  },[location,navigate])

  const submitHandler = (e: any) => {
    e.preventDefault();
    Axios.post(`${BASE_URL}/v1/addEmployee`, {
      username: userName,
      rootUser: location.state.username,
      assignedDomain: dom,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
      // if (res.data.status === "ok") {
      //   navigate("/orguserdb",{
      //     state:{
      //       username:res.data.username,
      //     }
      //   });
      // }
    });

    setUserName("");
    setDom("Technical");
    setEmail("");
    setPassword("");
    setConfPassword("");
  };


  // const getEmployees = (e:any) =>{
  //   e.preventDefault();
  //   Axios.get(`http://localhost:1337/api/v1/getAllEmployees?username=${location.state.username}`).then((res)=>{
  //     console.log(res);
  //     // setEmpList(res.data.employees);
  //   })
  // }
  

  useEffect(()=>{
    Axios.get(`http://localhost:1337/api/v1/getAllEmployees?username=${location.state.username}`).then((res)=>{
      console.log(res);
      setEmpList(res.data.employees);
    })
  },[location])

  useEffect(()=>{
    Axios.get(`http://localhost:1337/api/v1/getAllOrgTickets?username=${location.state.username}`).then((res)=>{
      console.log(res);
      setTickets(res.data.tickets)
    })
  },[location])

  const LogoutHandler = ()=>{
    props.loggedOut()
    navigate('/login')
  }

  

  return (
    <>{
      (localStorage.getItem("userLoggedIn")==="true")?
    <div className="h-screen">
      <header className="orgdash_header">
        
        <h2><CgProfile/>  {location.state.username}</h2>
        <button onClick={()=>{
            LogoutHandler()
            }}>Logout</button>
      </div>

      <div className="">
            <h1 className="m-2 text-center text-3xl text-slate-500">
              {" "}
              DashBoard
            </h1>
      </div>
      
      
      
      <div className="features">
        {!addUser && <button onClick={startAdding} className="add-btn">Add Technician(employee)</button>}

      </div>
      
      

      {addUser && (
        <form onSubmit={submitHandler}>
          <h1>Assign emp</h1>
          <div className="details">
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e: any) => {
                setUserName(e.target.value);
              }}
            />
            <select name="category" id="" value={dom} onChange={(e: any) =>{
             setDom(e.target.value);
            }}>
              <option value="tech">Technical</option>
              <option value="howto">How To</option>
              <option value="feature">Feature Request</option>
            </select>
            <input
              type="text"
              placeholder="Org. Mail"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confPassword}
              onChange={(e: any) => {
                setConfPassword(e.target.value);
              }}
            />
          </div>
          <div className="form_controls">
            <button onClick={stopAdding}>Cancel</button>
            <button type="submit">Add User</button>
          </div>
        </form>
      )}
      <hr />
      
   
      <div className="employee-container">
        <div className="employee_header">
          <h4>Employee List</h4>
          <div className="employee_count">{empList?.length}</div> 
        </div>
        
        <hr />
        <div className="employee-list">
          {empList?.map((val)=>
          <div className="employee_card" key={val._id}>
            <div className="employee_details">
              employee Name: {val.username}
              <br />
              Domain: {val.assignedDomain}
            </div>
            <div className="employee_buttons">
              <button><AiOutlineSetting/></button>
            </div>
            
          </div>
          )}
        </div>
        

      </div>
      <hr />


      <h2>Tickets:</h2>
      <div className='tickets_container'>
        
        <div className="active_tickets">
          <div className="ticket_header">
            <div>Active Tickets</div>
            <div className="ticket_count">
              {tickets?.filter((obj) => obj.status === "Active").length}
            </div>
          </div>
          <hr />
          {tickets?.filter(obj=>obj.status === "Active").length !== 0?tickets?.filter(obj=>obj.status === "Active").map((val)=>
            <div className='ticket_div' key={val._id}>Company-{val.organizationName}<br/>
            Category-{val.category}<br/>
            query-{val.query}
            </div>
          ):<p>none found</p>}
        </div>

        <div className="active_tickets">
          <div className="ticket_header">
            <div>Accepted Tickets</div>
            <div className="ticket_count">
              {tickets?.filter((obj) => obj.status === "Accepted").length}
            </div>
          </div>
          <hr />
          {tickets?.filter(obj=>obj.status === "Accepted").length!==0?tickets?.filter(obj=>obj.status === "Accepted").map((val)=>
            <div className='ticket_div' key={val._id}>Company-{val.organizationName}<br/>
            Category-{val.category}<br/>
            query-{val.query}
            </div>
          ):<p>none found</p>}
        </div>

        <div className="active_tickets">
          <div className="ticket_header">
            <div>Closed Tickets</div>
            <div className="ticket_count">
              {tickets?.filter((obj) => obj.status === "closed").length}
            </div>
          </div>
          <hr/>
          {tickets?.filter(obj=>obj.status === "closed").length!==0?tickets?.filter(obj=>obj.status === "closed").map((val)=>
            <div className='ticket_div' key={val._id}>Company-{val.organizationName}<br/>
            Category-{val.category}<br/>
            query-{val.query}</div>
          ):<p>none found</p>}
        </div>
        
      </div>
    </div>:null}</>
  );
};

export default OrgDashboard;
