import Meal from "./Meal";
import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useMeals } from "../context/MealsContext";

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

const Meals = () => {
  const { meals, addMeal } = useMeals();

  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMealOnClick = () => {
    if (
      (document.getElementById("AddMealInput") as HTMLInputElement).value !== ""
    ) {
      addMeal(
        (document.getElementById("AddMealInput") as HTMLInputElement).value
      );
    }
    handleClose();
  };

  return (
    <div className="Meals">
      {meals.meals.map((meal: any) => (
        <Meal key={meal.id} meal={meal} />
      ))}
      {meals.meals.length < 8 ? (
        <div className="AddMeal" onClick={handleClickOpen}>
          <AddCircleOutlineOutlinedIcon
            sx={{ fontSize: 35 }}
            className="AddMealIcon"
          ></AddCircleOutlineOutlinedIcon>
        </div>
      ) : null}

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
          {"Add Meal"}
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
              placeholder="Mealname"
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
          <div className="AddMealButton" onClick={addMealOnClick}>
            Add Meal
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Meals;
