import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AdjustCalories = () => {
  const navigate = useNavigate();
  const { user, changeCalories, changeCarbs, changeProtein, changeFat } = useUser();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");


  
  const handleClickOpen = (title: string) => {
    (document.getElementById("AddMealButton") as HTMLButtonElement).disabled = true; 
    (document.getElementById("AddMealInput") as HTMLInputElement).value = "";
    setTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adjustValueOnClick = () => {

    if (!parseInt((document.getElementById("AddMealInput") as HTMLInputElement).value)) {
      alert("Please type in a number!");
    }

    if(title === "Calories"){
      changeCalories(parseInt((document.getElementById("AddMealInput") as HTMLInputElement).value));
    }else if(title === "Carbs"){
      changeCarbs(parseInt((document.getElementById("AddMealInput") as HTMLInputElement).value));
    }else if(title === "Protein"){
      changeProtein(parseInt((document.getElementById("AddMealInput") as HTMLInputElement).value));
    }else if(title === "Fat"){
      changeFat(parseInt((document.getElementById("AddMealInput") as HTMLInputElement).value));
    }

    handleClose();
  };

  const validate = (e : KeyboardEvent) => {
    if(isNaN(parseInt(e.key)) && e.key !== "Backspace" && e.key !== "ArrowRight" && e.key !== "ArrowLeft"){
        e.preventDefault();
    }
    return true;
  }

  const disableButton = () => {
    if(!parseInt((document.getElementById("AddMealInput") as HTMLInputElement).value)){
      (document.getElementById("AddMealButton") as HTMLButtonElement).disabled = true; 
    }else{
      (document.getElementById("AddMealButton") as HTMLButtonElement).disabled = false; 
    }
  }

  return (
    <div className="AdjustCalories">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate("/Profile");
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="AdjustCaloriesHeaderText">Adjust Calories & Macros</div>
      </header>
      <div className="PersonalDataContent">
        <div className="PersonalDataTitle">Calories</div>
        <div className="PersonalDataCategory">
          <div className="PersonalDataColumn ClickableDataColumn" onClick={() => {handleClickOpen("Calories")}}>
            <div className="PersonalDataColumnTitle">Calorie Goal</div>
            <div className="PersonalDataColumnText">
              {user.calorieGoal} kcal
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
        </div>
        
        <div className="PersonalDataTitle">Macros</div>
        <div className="PersonalDataCategory">
          <div className="PersonalDataColumn ClickableDataColumn" onClick={() => {handleClickOpen("Carbs")}}>
            <div className="PersonalDataColumnTitle">Carbs</div>
            <div className="PersonalDataColumnText">
              {user.carbs} g
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn ClickableDataColumn" onClick={() => {handleClickOpen("Protein")}}>
            <div className="PersonalDataColumnTitle">Protein</div>
            <div className="PersonalDataColumnText">
              {user.protein} g
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
          <hr className="Solid"></hr>
          <div className="PersonalDataColumn ClickableDataColumn" onClick={() => {handleClickOpen("Fat")}}>
            <div className="PersonalDataColumnTitle">Fat</div>
            <div className="PersonalDataColumnText">
              {user.fat} g
              <ArrowForwardIosIcon className="PersonalDataColumnSVG" sx={{ fontSize: 18 }}></ArrowForwardIosIcon>
            </div>
          </div>
        </div>
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
          {"Adjust " + title}
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
              placeholder={title === "Calories" ? title +" (kcal)" : title +" (g)"}
              onKeyDown={(event) => validate(event as any)}
              onChange={disableButton}
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
          <button className="AddMealButton" id="AddMealButton" onClick={() => {adjustValueOnClick()}}>
            Add {title}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdjustCalories;

