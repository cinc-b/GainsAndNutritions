import React from "react";

import { useNavigate} from 'react-router-dom'

import ArrowBackIcon from "@mui/icons-material/ArrowBack";



const Settings = () => {

    const navigate = useNavigate()

  return (
    <div className="Settings">
      <header className="ProfileHeader">
        <ArrowBackIcon onClick={() => {navigate("/Profile")}} sx={{ fontSize: 35 }}></ArrowBackIcon>
      </header>
      <div className="WIP">Work in Progress</div>
    </div>
  );
};

export default Settings;
