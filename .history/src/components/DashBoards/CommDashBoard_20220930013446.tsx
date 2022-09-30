import React, { useState, useEffect } from "react";
import RaiseTicket from "../forms/CustomerForms/RaiseTicket";
import OrgList from "../others/OrgList";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { CgProfile } from "react-icons/cg";
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

interface dashboardProps {
  loggedOut: () => void;
}

const CommDashBoard = (props: dashboardProps) => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [tickets, setTickets] = useState<ticketstate[]>();
  //profile edit
  const [editProfile, setEditProfile] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const orgButtonHandler = (orgName: string) => {
    setSelectedOrg(orgName);
  };

  const startEdit = () => {
    setEditProfile(true);
  };
  const stopEdit = () => {
    setEditProfile(false);
  };

  const location = useLocation() as locationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state === null) navigate("/login");
  }, [location, navigate]);

  useEffect(() => {
    Axios.get(
      `${BASE_URL}/v1/getUserTickets?username=${location.state?.username}`
    ).then((res) => {
      setTickets(res.data.tickets);
    });
  }, [location, selectedOrg]);

  const closeButtonHandler = (id: string) => {
    Axios.get(`${BASE_URL}/v1/closeCustomerTicket?id=${id}`).then((res) => {
      console.log(res.data);
      setTickets(res.data.tickets);
    });
  };

  const profileEditHandler = (e: any) => {
    e.preventDefault();
    // console.log(Obj)
    Axios.put(`${BASE_URL}/v1/editCustomer`, {
      username: location.state?.username, //fixed
      email: newEmail,
      phone: newPhone,
    }).then((res) => {
      console.log(res);
      setNewEmail("");
      setNewPhone("");
    });
  };

  const LogoutHandler = () => {
    props.loggedOut();
    navigate("/login");
  };
  return (
    <>
      {localStorage.getItem("userLoggedIn") === "true" ? (
        <div className="hei">
          <div className="w-full h-20 items-center flex flex-row justify-between bg-gray-300">
            <div className="text-4xl">TICKET.EASY</div>
            <h4 className="flex gap-5">
              {!editProfile && (
                <CgProfile
                  onClick={startEdit}
                  className="text-3xl cursor-pointer"
                />
              )}{" "}
              {location.state?.username}
              <button className="p-1 bg-slate-500 rounded-xl text-white"
                onClick={() => {
                  LogoutHandler();
                }}
              >
                Logout
              </button>
            </h4>
          </div>

          {editProfile && (
            <form onSubmit={profileEditHandler} className="w-96 bg-slate-400 h-max rounded-md p-10 flex flex-col justify-center items-center">
              <h1 className="mb-5 text-3xl text-center text-white font-semibold ">Edit profile</h1>
              <div className="w-56 flex flex-col">
                <div className="mb-3">username: <span className="text-white">{location.state?.username}</span></div>
                
                <input
                className="mb-5 rounded-md p-1"
                  type="email"
                  placeholder="enter your email address"
                  value={newEmail}
                  required
                  onChange={(e: any) => {
                    setNewEmail(e.target.value);
                  }}
                />
                <input
                className="mb-5 rounded-md p-1"
                  type="text"
                  placeholder="Enter your contact number"
                  value={newPhone}
                  required
                  onChange={(e: any) => {
                    setNewPhone(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-16">
                <button onClick={stopEdit} className="mb-10 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">cancel</button>
                <button type="submit" className="mb-10 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">save</button>
              </div>
            </form>
          )}

          <div className="">
            <h1 className="m-2 text-center text-3xl text-slate-500">
              {" "}
              DashBoard
            </h1>
          </div>

          <div className="m-3 w-auto rounded-md p-5 bg-slate-600 flex flex-col">
            <h3 className="text-2xl text-white">Companies</h3>
            <hr />
            <OrgList orgButtonHandler={orgButtonHandler} />
            {selectedOrg !== "" ? (
              <RaiseTicket
                orgName={selectedOrg}
                username={location.state?.username}
              />
            ) : null}
          </div>
          <h3>Tickets:</h3>

          <div className=" m-3 w-auto rounded-md p-5 bg-slate-600 flex justify-evenly">
            <div className=" bg-slate-400 rounded-md w-96">
              <div className=" flex justify-between p-2">
                <div>Active Tickets</div>
                <div className=" bg-slate-600 p-1 rounded-lg text-white">
                  {tickets?.filter((obj) => obj.status === "Active").length}
                </div>
              </div>

              <hr />

              {tickets?.filter((obj) => obj.status === "Active").length !==
              0 ? (
                tickets
                  ?.filter((obj) => obj.status === "Active")
                  .map((val) => (
                    <div className="m-3 bg-slate-600 text-white p-2 rounded-md flex justify-between">
                      Company-{val.organizationName}
                      <br />
                      Category-{val.category}
                      <br />
                      query-{val.query}
                      <div className="">
                        <button onClick={() => closeButtonHandler(val._id)}>
                          close
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="m-4 text-center">none found</p>
              )}
            </div>

            <div className="accepted_tickets bg-slate-400 rounded-md w-96">
              <div className="ticket_header flex justify-between p-2">
                <div>Accepted Tickets</div>
                <div className="ticket_count bg-slate-600 p-1 rounded-lg text-white">
                  {tickets?.filter((obj) => obj.status === "Accepted").length}
                </div>
              </div>

              <hr />
              {tickets?.filter((obj) => obj.status === "Accepted").length !==
              0 ? (
                tickets
                  ?.filter((obj) => obj.status === "Accepted")
                  .map((val) => (
                    <div className="m-3 bg-slate-600 text-white p-2 rounded-md flex justify-between">
                      Company-{val.organizationName}
                      <br />
                      Category-{val.category}
                      <br />
                      query-{val.query}
                      <div className="ticket_buttons">
                        <button onClick={() => closeButtonHandler(val._id)}>
                          close
                        </button>
                        <button>Chat</button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="m-4 text-center">none found</p>
              )}
            </div>

            <div className="closed_tickets bg-slate-400 rounded-md w-96">
              <div className="ticket_header flex justify-between p-2 ">
                <div>Closed Tickets</div>
                <div className="ticket_count bg-slate-600 p-1 rounded-lg text-white">
                  {tickets?.filter((obj) => obj.status === "closed").length}
                </div>
              </div>

              <hr />
              {tickets?.filter((obj) => obj.status === "closed").length !==
              0 ? (
                tickets
                  ?.filter((obj) => obj.status === "closed")
                  .map((val) => (
                    <div className="m-3 bg-slate-600 text-white p-2 rounded-md flex justify-between">
                      Company-{val.organizationName}
                      <br />
                      Category-{val.category}
                      <br />
                      query-{val.query}
                      <div className="ticket_buttons"></div>
                    </div>
                  ))
              ) : (
                <p className="m-4 text-center">none found</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CommDashBoard;
