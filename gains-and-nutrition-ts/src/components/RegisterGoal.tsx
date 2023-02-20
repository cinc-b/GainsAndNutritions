import React from "react";

type RegisterGoalProps = {
    changeActive: (value: number) => void;
    changeGoal: (goalToSet: string) => void;
}
const RegisterGoal = ({changeActive, changeGoal} : RegisterGoalProps) => {

    const funcForOnClick = (goalToSet : string) => {
        changeActive(2);
        changeGoal(goalToSet);
    }


  return (
    <div className="RegisterGoals">
      <div className="RegisterGoal" onClick={() => funcForOnClick("lose")}>
        <div className="RegisterGoalTitle">Lose weight</div>
        <div className="RegisterGoalDesc">Manage your weight by eating smarter</div>
      </div>
      <div className="RegisterGoal" onClick={() => funcForOnClick("stay")}>
        <div className="RegisterGoalTitle">Maintain weight</div>
        <div className="RegisterGoalDesc">Optimize your well-being</div>
      </div>
      <div className="RegisterGoal" onClick={() => funcForOnClick("gain")}>
        <div className="RegisterGoalTitle">Gain weight</div>
        <div className="RegisterGoalDesc">Build strength wit high-protein food</div>
      </div>
    </div>
  );
};

export default RegisterGoal;
