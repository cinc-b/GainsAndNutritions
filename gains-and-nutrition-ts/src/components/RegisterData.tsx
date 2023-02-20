import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";

type RegisterDataProps = {
  changeActive: (value: number) => void;
  goal: string;
  changeBiologicalData: (changeBiologicalData: Object) => void;
};

const RegisterData = ({ changeActive, goal, changeBiologicalData, }: RegisterDataProps) => {
  const { register, handleSubmit, formState: { errors, isValid, isDirty },} = useForm({ mode: "onTouched" });

  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);

  const addClass = (id: string) => {
    if (id === "female") {
      let element1 = document.getElementById(id + "Input");
      let element2 = document.getElementById("maleInput");
      element1!.classList.add("active");
      element2!.classList.remove("active");
      setGender(id);
    } else if (id === "male") {
      let element1 = document.getElementById(id + "Input");
      let element2 = document.getElementById("femaleInput");
      element1!.classList.add("active");
      element2!.classList.remove("active");
      setGender(id);
    }
  };

  //Would have been the custom error message for the gender selection
  /*
  function insertAfter(referenceNode: Element, newNode:HTMLElement) {
    if(referenceNode.parentNode !== null){
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }
    if(gender === ""){
      console.log(gender);

      if(document.getElementsByClassName("RegisterInputErrorGender").length > 0) return;

      const collection = document.getElementsByClassName("RegisterRadioLabels");
      let elemToInsertAfter = collection[0];
      
      let errorElem = document.createElement("div");
      errorElem.innerHTML = "Please check the Gender";
      errorElem.className = "RegisterInputErrorGender";
      
      if(elemToInsertAfter !== null){
        insertAfter(elemToInsertAfter, errorElem);
      }
    }*/

  const setBiologicalData = (data: any) => {
    let object = data;
    object.gender = gender;
    object.goal = goal;
    changeBiologicalData(object);
    changeActive(3);

    console.log(object);
  };

  return (
    <div className="RegisterData">
      <form className="RegisterForm" onSubmit={handleSubmit(setBiologicalData)}>
        <header className="RegisterHeader" onClick={() => changeActive(1)}>
          <ArrowBackIcon sx={{ fontSize: 35 }}></ArrowBackIcon>
        </header>
        <div className="RegisterRadioboxes">
          <div className="RegisterRadioLabels">
            <label
              className="RegisterRadioLabel"
              id="femaleInput"
              onClick={() => addClass("female")}
            >
              <span className="RegisterLabel">Female</span>
            </label>
            <label
              className="RegisterRadioLabel"
              id="maleInput"
              onClick={() => addClass("male")}
            >
              <span className="RegisterLabel">Male</span>
            </label>
          </div>
        </div>
        <div className="RegisterTitleInput">
          <div className="RegisterTitle">Age</div>
          <input
            id="AgeInput"
            className="RegisterInput"
            type="number"
            placeholder="Your Age"
            {...register("age", { required: true, min: 18, max: 80 })}
          />
          {errors.age && (
            <div className="RegisterInputError">Please check the Age</div>
          )}
        </div>
        <div className="RegisterTitleInput">
          <div className="RegisterTitle">
            Height <span> (cm) </span>
          </div>
          <input
            id="HeightInput"
            className="RegisterInput"
            type="number"
            placeholder="Your Height"
            {...register("height", { required: true, min: 150 })}
          />
          {errors.height && (
            <div className="RegisterInputError">Please check the Height</div>
          )}
        </div>
        <div className="RegisterTitleInput">
          <div className="RegisterTitle">
            Weight <span> (kg) </span>
          </div>
          <input
            id="WeightInput"
            className="RegisterInput"
            type="number"
            placeholder="Your Weight"
            {...register("weight", { required: true, min: 40 })}
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
          {errors.weight && (
            <div className="RegisterInputError">Please check the Weight</div>
          )}
        </div>
        {goal === "stay" ? null : (
          <div className="RegisterTitleInput">
            <div className="RegisterTitle">Targetweight</div>
            <input
              id="TargetWeightInput"
              className="RegisterInput"
              type="number"
              placeholder="Targetweight"
              {...register("targetWeight", {
                required: true,
                //min: goal === "gain" ? weight + 1 : 40,
                //max: goal === "lose" ? weight - 1 : 200,
                validate: {
                  greaterThanWeight: v => (goal === "gain" ? parseInt(v) > weight : true),
                  lessThanWeight: v => (goal === "lose" ? parseInt(v) < weight : true)
                }
              })}
            />
            {errors.targetWeight && (
              <div className="RegisterInputError">
                Please check the Targetweight
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          className="LoginButton"
          disabled={!isDirty || !isValid || gender === ""}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RegisterData;
