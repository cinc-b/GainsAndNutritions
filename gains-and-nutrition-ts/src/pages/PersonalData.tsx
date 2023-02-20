import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PersonalData = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="PersonalData">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate("/Profile");
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="HeaderText">Personal Data</div>
      </header>
      <div className="PersonalDataContent">
        <div className="PersonalDataTitle">Your Goal</div>
        <div className="PersonalDataCategory">
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Goal</div>
            <div className="PersonalDataColumnText">
              {user.goal.toUpperCase()}
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Target weight</div>
            <div className="PersonalDataColumnText">
              {user.targetWeight} kg
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
        </div>

        <div className="PersonalDataTitle">Details</div>
        <div className="PersonalDataCategory">
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Firstname</div>
            <div className="PersonalDataColumnText">
              {user.firstName}
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Current weight</div>
            <div className="PersonalDataColumnText">
              {user.weight} kg
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Height</div>
            <div className="PersonalDataColumnText">
              {user.height} cm
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Age</div>
            <div className="PersonalDataColumnText">
              {user.age} 
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn">
            <div className="PersonalDataColumnTitle">Gender</div>
            <div className="PersonalDataColumnText">
              {user.gender} 
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
