import React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUser } from "../context/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="Profile">
      <header className="ProfileHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate("/");
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="SettingsIcon">
          <Link className="Link" to={"/settings"}>
            <SettingsIcon sx={{ fontSize: 35 }}></SettingsIcon>
          </Link>
        </div>
      </header>
      <div className="Content">
        <div className="ProfileDisplay">
          <div className="AccountIconNameAge">
            <AccountCircleIcon sx={{ fontSize: 110 }} className="AccountIcon"></AccountCircleIcon>
            <div className="NameAge">
              <div className="Name">{user.firstName}</div>
              <div className="Age">{user.age} years old</div>
            </div>
          </div>
          <div className="WeightGoalDiet">
            <div className="WGDText">
                <div className="WGDDescription">Current Weight</div>
                <div className="WGDValue">{user.weight} kg</div>
            </div>
            <div className="WGDText">
                <div className="WGDDescription">Goal</div>
                <div className="WGDValue">{user.targetWeight} kg</div>
            </div>
            <div className="WGDText">
                <div className="WGDDescription">Diet</div>
                <div className="WGDValue">{user.goal.toUpperCase()}</div>
            </div>
          </div>
        </div>
        <div className="Personalize">
            <div className="PersonalizeHeader">Personalize</div>
            <div className="PersonalizeContent">
                <Link to={"/PersonalData"} className="Personalization Link">
                    <div>Personal Data</div>
                    <ArrowForwardIosIcon sx={{ fontSize: 20 }}></ArrowForwardIosIcon>
                </Link>
                <hr className="Solid"></hr>
                <Link to={"/AdjustCalories"} className="Personalization Link">
                    <div>Adjust Calories</div>
                    <ArrowForwardIosIcon sx={{ fontSize: 20 }}></ArrowForwardIosIcon>
                </Link>
                <hr className="Solid"></hr>
                <div className="Personalization">
                    <div>Set Habits</div>
                    <ArrowForwardIosIcon sx={{ fontSize: 20 }}></ArrowForwardIosIcon>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
