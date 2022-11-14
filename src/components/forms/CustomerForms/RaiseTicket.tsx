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
    <form onSubmit={submitHandler} className="bg-slate-400 absolute left-1/2 z-20 p-5 rounded-md flex flex-col gap-3 justify-center items-center">
      <h1 className="text-xl ">{props.orgName} Ticket Form</h1>
      <div className="details flex flex-col gap-3 justify-center items-center">
        <div>
          <label>select category: </label>
          <select name="category" id="" value={cat} onChange={(e: any) =>{
             setCat(e.target.value);
          }} >
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
        <button type="submit" className="mb-10 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">Submit</button>
        <button className="mb-10 bg-gray-600 py-1 px-3 rounded-md text-white font-semibold hover:scale-125 hover:bg-slate-500">Cancel</button>
      </div>
      
    </form>
  );
};

export default RaiseTicket;
