import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BASE_URL } from "../../api/apiCalls";

export interface orgListProps {
  orgButtonHandler: (orgName: string) => void;
}

const OrgList = (props: orgListProps) => {
  const [orgList, setOrgList] = useState<string[]>();
  

  useEffect(() => {
    Axios.get(`${BASE_URL}/v1/getOrganizationsList`).then(
      (res) => {
        setOrgList(res.data.organizations);
      }
    );
  }, []);

  return (
    <>
    
      {orgList?.length!==0?orgList?.map((org) => (
        <div key={org} className="m-2 p-2 w-52 h-36 text-center flex justify-center text-2xl text-white bg-slate-700 rounded-md">
          <button onClick={() => {
            props.orgButtonHandler(org);
          }}>{org}</button>
        </div>
      )):<p className="m-5 text-center text-slate-400">none found</p>}
    </>
  );
};

export default OrgList;
