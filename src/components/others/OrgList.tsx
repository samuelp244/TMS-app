import React, { useState, useEffect } from "react";
import Axios from "axios";
import './OrgList.css'

export interface orgListProps {
  orgButtonHandler: (orgName: string) => void;
}

const OrgList = (props: orgListProps) => {
  const [orgList, setOrgList] = useState<string[]>();
  

  useEffect(() => {
    Axios.get("http://localhost:1337/api/v1/getOrganizationsList").then(
      (res) => {
        setOrgList(res.data.organizations);
      }
    );
  }, []);

  return (
    <>
    
      {orgList?.length!==0?orgList?.map((org) => (
        <div key={org} className="org-list">
          <button onClick={() => {
            props.orgButtonHandler(org);
          }}>{org}</button>
        </div>
      )):<p>none found</p>}
    </>
  );
};

export default OrgList;
