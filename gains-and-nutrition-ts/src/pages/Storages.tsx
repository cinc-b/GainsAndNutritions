import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Storage from "../components/Storage";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useUser } from "../context/UserContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useMeals } from "../context/MealsContext";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Storages = () => {
  const navigate = useNavigate();
  const { user, addStorage } = useUser();

  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addExtraMealOnClick = () => {
    if (
      (document.getElementById("AddMealInput") as HTMLInputElement).value !== ""
    ) {
      addStorage(
        (document.getElementById("AddMealInput") as HTMLInputElement).value
      );
    }
    handleClose();
  };


  return (
    <div className="Storages">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate("/");
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="HeaderText">Storage</div>
      </header>
      <div className="StoragesColumn">
        {user.storage.map((storage: any) => (
          <Storage key={storage.location} location={storage.location} />
        ))}
        <div className="AddExtraMeal" >
          <AddCircleOutlineOutlinedIcon
            sx={{ fontSize: 45 }}
            className="AddMealIcon"
            onClick={handleClickOpen}
          ></AddCircleOutlineOutlinedIcon>
        </div>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            "background-color": "#1c1c1f",
            "border-radius": "5px",
          },
        }}
      >
        <DialogTitle
          sx={{
            "background-color": "#1c1c1f",
            color: "white",
            "font-family": "'Oswald', sans-serif",
            "font-size": "28px",
          }}
        >
          {"Add Extrameal"}
        </DialogTitle>
        <DialogContent
          sx={{
            "background-color": "#1c1c1f",
            height: "50px",
            overflow: "hidden",
          }}
        >
          <div className="LoginTitleInput">
            <input
              id="AddMealInput"
              className="AddMealInput"
              type="text"
              placeholder="Extramealname"
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            "background-color": "#1c1c1f",
            display: "flex",
            justifyContent: "center",
            color: "white",
            "padding-bottom": "20px",
          }}
        >
          <div className="AddMealButton" onClick={addExtraMealOnClick}>
            Add Extrameal
          </div>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
};

export default Storages;
