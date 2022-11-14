import Axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../../api/apiCalls";


export interface orgNameProps{
  orgName: string,
  username:string,
}


const RaiseTicket = (props:orgNameProps) => {
  const [cat,setCat]=useState("Technical");
  const [query, setQuery] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    Axios.post(`${BASE_URL}/v1/addNewTicket`,{
      organizationName:props.orgName,
      category:cat,
      username:props.username,
      query:query
    }).then((res)=>{
      console.log(res);
    })

    setQuery("");
    setCat("Technical");
  };

  return (
    <form onSubmit={submitHandler} className="bg-slate-400 absolute left-1/2 z-20 p-10 rounded-md flex flex-col gap-2 justify-center items-centre">
      <h1 className="text-xl ">{props.orgName} Ticket Form</h1>
      <div className="details">
        <div>
          <label>select category: </label>
          <select name="category" id="" value={cat} onChange={(e: any) =>{
             setCat(e.target.value);
          }}>
            <option value="tech">Technical</option>
            <option value="howto">How To</option>
            <option value="feature">Feature Request</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="enter your query here"
          value={query}
          onChange={(e: any) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div className="form_controls">
        <button type="submit">Submit</button>
        <button>Cancel</button>
      </div>
      
    </form>
  );
};

export default RaiseTicket;
