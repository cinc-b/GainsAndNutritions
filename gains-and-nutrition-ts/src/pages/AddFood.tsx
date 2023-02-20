import { useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CropFreeIcon from "@mui/icons-material/CropFree";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { useMeals } from '../context/MealsContext';
import Food from '../components/Food';


const AddFood = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  const { findFood } = useMeals();

  const [food , setFood] = useState<Array<Object>>();

  useEffect(() => {
    if(location.state){
      if(location.state.eanCodeFromCamera){
        (document.getElementById("SearchInput") as HTMLInputElement).value = location.state.eanCodeFromCamera;
        console.log(location.state.eanCodeFromCamera)
      }
  
    return () => {

    }
  }},[location]);
  
  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      setFood(await findFood((e.target as HTMLInputElement).value)); 
    }
 }
    

  return (
    <div className="AddFood">
      <header className="AddFoodHeader">
        <div className="BackArrow-Meal">
          <ArrowBackIcon
            onClick={() => {
              parseInt(id!) ? navigate(`/MealDetails/${id!}`) : (id! === "0" ? navigate(`/MealDetails/${id!}`) : navigate(`/StorageDetails/${id!}`))
            }}
            sx={{ fontSize: 35 }}
          ></ArrowBackIcon>
          <div>{parseInt(id!) ? "Add Food" : (id! === "0" ? "Add Food" : "Add Food to Storage")}</div>
        </div>
        <div className="AddFoodSearchBar">
          <div className="SearchIcon-SearchInput">
            <SearchIcon sx={{ fontSize: 30 }} className="SearchIcon" type="submit"></SearchIcon>
            <input id="SearchInput" className="SearchInput" type="text" onKeyDown={(e) => search(e)} placeholder="Search.."/>
          </div>
          <div className="Icons">
            <Link className="Link" to={`/BarcodeScanner/${id}`} >
              <CropFreeIcon className="QRIcon"sx={{ fontSize: 30 }}></CropFreeIcon>
            </Link>
            <Link className="Link" to={`/BarcodeScanner/${"add"}`} >
              <AddBoxOutlinedIcon className="AddFoodIcon"sx={{ fontSize: 30 }}></AddBoxOutlinedIcon>
            </Link>
          </div>
          
        </div>
      </header>
      { food && food.length > 0 
          ? food.map((food: any, index: number) => <Food key={index} food={food}/>)
          : ""}
      <div className='Spacer'></div>
    </div>
  );
};

export default AddFood;
