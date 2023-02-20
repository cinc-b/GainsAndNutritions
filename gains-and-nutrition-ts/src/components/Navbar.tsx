import React from "react";

import EventIcon from "@mui/icons-material/Event";
import MovingIcon from "@mui/icons-material/Moving";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="NavbarItem">
        <EventIcon className="NavbarIcon"></EventIcon>
        <div>Diary</div>
      </div>
      <div className="NavbarItem">
        <MovingIcon className="NavbarIcon"></MovingIcon>
        <div>Progress</div>
      </div>
      <div className="NavbarItem">
        <MenuBookRoundedIcon className="NavbarIcon"></MenuBookRoundedIcon>
        <div>Recipes</div>
      </div>
    </div>
  );
};

export default Navbar;
