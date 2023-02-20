import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import CalorieCounter from "../components/CalorieCounter";
import Meals from "../components/Meals";
import Navbar from "../components/Navbar";
import { useMeals } from "../context/MealsContext";
import { useUser } from "../context/UserContext";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Home = () => {
  const { setDate, date } = useMeals();
  const { selectedLocation } = useUser();

  const { ref: swipeRef } = useSwipeable({
    onSwipedLeft: () => {
      console.log("Left swipe");
      setDate(new Date(date.setDate(date.getDate() + 1)));
      console.log(date);
    },
    onSwipedRight: () => {
      console.log("Right swipe");
      setDate(new Date(date.setDate(date.getDate() - 1)));
      console.log(date);
    },
  });

  return (
    <div className="Home">
      <div className="NutritionsTab">
        <header className="AppHeader">
          <Link className="Link LocationIcon-LocationText" to={"/Storages"}>
            <LocationOnIcon sx={{ fontSize: 35 }}></LocationOnIcon>
            <div className="LocationText">{selectedLocation}</div>
          </Link>
          <h3>Gains & Nutrition</h3>
          <div className="ProfileIcon">
            <Link className="Link" to={"/Profile"}>
              <PersonOutlineOutlinedIcon
                sx={{ fontSize: 35 }}
              ></PersonOutlineOutlinedIcon>
            </Link>
          </div>
        </header>
        <div className="NutritionContent" ref={swipeRef}>
          <CalorieCounter></CalorieCounter>
          <div className="MealsDate">
            {date.toLocaleDateString("en-EN", { weekday: "long" }) +
              ", " +
              date.getDate() +
              "." +
              (date.getMonth() + 1) +
              "."}
          </div>
          <Meals></Meals>
        </div>
        <Navbar></Navbar>
      </div>
    </div>
  );
};

export default Home;
