import React, { useState } from "react";
import RegisterCredentials from "../components/RegisterCredentials";
import RegisterData from "../components/RegisterData";
import RegisterGoal from "../components/RegisterGoal";

const Register = () => {
  const [active, setActive] = useState(1);
  const [goal, setGoal] = useState("");
  const [biologicalData, setbiologicalData] = useState({});

  const changeActive = (value: number) => {
    setActive(value);
    console.log(active);
  };

  const changeGoal = (goalToSet: string) => {
    setGoal(goalToSet);
  };

  const changeBiologicalData = (biologicalData : Object) => {
    setbiologicalData(biologicalData);
  }

  return (
    <div className="Register">
      {active === 1 ? (
        <RegisterGoal changeActive={changeActive} changeGoal={changeGoal} />
      ) : active === 2 ? (
        <RegisterData changeActive={changeActive} goal={goal} changeBiologicalData={changeBiologicalData}/>
      ) : active === 3 ? (
        <RegisterCredentials changeActive={changeActive} biologicalData={biologicalData}/>
      ) : null}
    </div>
  );
};

export default Register;
