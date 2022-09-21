import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {CgProfile} from "react-icons/cg"
import { BASE_URL } from "../../api/apiCalls";


export interface locationState {
  state: {
    username: string;
  };
}

export interface ticketstate {
  category: string;
  organizationName: string;
  publishedAt: string;
  query: string;
  status: string;
  username: string;
  _id: string;
}

interface dashboardProps{
  loggedOut:()=>void
}

const OrgUserDashBoard = (props:dashboardProps) => {
  const [tickets, setTickets] = useState<ticketstate[]>();

  const location = useLocation() as locationState;

  console.log(location.state);
  useEffect(() => {
    Axios.get(
      `${BASE_URL}/v1/getAllTickets?username=${location.state.username}`
    ).then((res) => {
      console.log(res);
      setTickets(res.data.tickets);
    });
  }, [location]);

  const navigate = useNavigate();
  useEffect(()=>{
    console.log(location.state)
    if(location.state === null) navigate("/login")
  },[location,navigate])

  const acceptHandler = (id: string) => {
    Axios.get(
      `${BASE_URL}/v1/acceptTicket?id=${id}&username=${location.state.username}`
    ).then((res) => {
      setTickets(res.data.tickets);
    });
  };

  const closeHandler = (id: string) => {
    Axios.get(
      `${BASE_URL}/v1/closeTicketEmployee?id=${id}&username=${location.state.username}`
    ).then((res) => {
      setTickets(res.data.tickets);
    });
  };
  const LogoutHandler = ()=>{
    props.loggedOut()
    navigate('/login')
  }
  return (
    <>{
      // (localStorage.getItem("userLoggedIn")==="true")?
    <div>
      <div className="empdash_header">
        <h1>emp DashBoard</h1>
        <h2><CgProfile/> {location.state.username}</h2>
        <button onClick={()=>{
            LogoutHandler()
            }}>Logout</button>
      </div>
      
      <hr />
       <h2>Tickets:</h2>
      <div className="tickets_container">
        <div className="active_tickets">
          <div className="ticket_header">
            <div>Active Tickets</div>
            <div className="ticket_count">
              {tickets?.filter((obj) => obj.status === "Active").length}
            </div>
          </div>
          <hr />
          {tickets?.filter((obj) => obj.status === "Active").length !== 0 ? (
            tickets
              ?.filter((obj) => obj.status === "Active")
              .map((val) => (
                <div className="ticket_div">
                  <div className="ticket_content">
                    Company-{val.organizationName}
                    <br />
                    Category-{val.category}
                    <br />
                    query-{val.query}
                  </div>
                  <div className="ticket_buttons">
                    <button onClick={() => acceptHandler(val._id)}>
                      accept
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p>none found</p>
          )}
        </div>

        <div className="active_tickets">
          <div className="ticket_header">
            <div>Accepted Tickets</div>
            <div className="ticket_count">
              {tickets?.filter((obj) => obj.status === "Accepted").length}
            </div>
          </div>
          <hr />
          {tickets?.filter((obj) => obj.status === "Accepted").length !== 0 ? (
            tickets
              ?.filter((obj) => obj.status === "Accepted")
              .map((val) => (
                <div className="ticket_div">
                  <div className="ticket_content">
                    Company-{val.organizationName}
                    <br />
                    Category-{val.category}
                    <br />
                    query-{val.query}
                  </div>
                  <div className="ticket_buttons">
                    <button>chat</button>
                    <button onClick={() => closeHandler(val._id)}>close</button>
                  </div>
                </div>
              ))
          ) : (
            <p>none found</p>
          )}
        </div>

        <div className="active_tickets">
        <div className="ticket_header">
            <div>Closed Tickets</div>
            <div className="ticket_count">
              {tickets?.filter((obj) => obj.status === "closed").length}
            </div>
          </div>
          <hr />
          {tickets?.filter((obj) => obj.status === "closed").length !== 0 ? (
            tickets
              ?.filter((obj) => obj.status === "closed")
              .map((val) => (
                <div className="ticket_div">
                  <div className="ticket_content">
                    Company-{val.organizationName}
                    <br />
                    Category-{val.category}
                    <br />
                    query-{val.query}
                  </div>
                </div>
              ))
          ) : (
            <p>none found</p>
          )}
        </div>
      </div>
    </div>
    // :null
    }</>
  );
};

export default OrgUserDashBoard;
