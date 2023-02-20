import React from "react";
import styled, { keyframes } from "styled-components";
import { useMeals } from "../context/MealsContext";
import { useUser } from "../context/UserContext";


const CalorieCounter = () => {
  const { user } = useUser();
  const { meals } = useMeals();

  const style = { "--percentage": (meals.calories/user.calorieGoal)*100+ "%" } as React.CSSProperties;


  const nutrimentLoad = (perc: number) => keyframes`
    0% { width: 0; }
    100% { width: ${perc}%; }
  `;

  const ProteinValue = styled.div.attrs((props: {perc: number}) => props)`
  animation: ${(props) => nutrimentLoad(props.perc)} 3s normal forwards;
  box-shadow: 0 10px L0px -10px #fff;
  border-radius: 100px;
  background: #fff;
  height: 3px;
  width: 0;
  `;

  
  return (
    <div className="CalorieCounter">
      <div className="CalorieDisplay">
        <div className="Calories">
          <div>{meals.calories}</div>
          <div>Consumed</div>
        </div>

        <div className="CalorieVisual">
          <div className="HalfArc" style={style}>
            <span className="label"> {(user.calorieGoal - meals.calories) < 0 ? (Math.abs(user.calorieGoal - meals.calories)+ " above")  : ((user.calorieGoal - meals.calories) + " left")}</span>
          </div>
        </div>

        <div className="Calories">
          <div>0</div>
          <div>Burned</div>
        </div>
      </div>
      <div className="NutritionDisplay">
        <div className="Nutrition">
            <div className="Text">Carbs</div>
            <div className="Progress">
                <ProteinValue perc={(meals.carbs/user.carbs)*100}></ProteinValue>
            </div>  
            <div className="Grams"> {Math.round(meals.carbs)} / {user.carbs}</div>  
        </div>
        <div className="Nutrition">
            <div className="Text">Protein</div>
            <div className="Progress">
                <ProteinValue perc={(meals.protein/user.protein)*100}></ProteinValue>
            </div>  
            <div className="Grams"> {Math.round(meals.protein)} / {user.protein}</div>  
        </div>
        <div className="Nutrition">
            <div className="Text">Fat</div>
            <div className="Progress">
                <ProteinValue perc={(meals.fat/user.fat)*100}></ProteinValue>
            </div>  
            <div className="Grams"> {Math.round(meals.fat)} / {user.fat}</div>  
        </div>
      </div>
    </div>
  );
};

export default CalorieCounter;
