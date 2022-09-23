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
        <div key={org} className="">
          <button onClick={() => {
            props.orgButtonHandler(org);
          }}>{org}</button>
        </div>
      )):<p class>none found</p>}
    </>
  );
};

export default OrgList;
