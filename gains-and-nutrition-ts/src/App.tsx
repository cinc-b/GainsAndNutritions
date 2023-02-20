import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AddFood from "./pages/AddFood";
import BarcodeScannerRework from "./pages/BarcodeScannerRework";
import MealDetails from "./pages/MealDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodDetails from "./pages/FoodDetails";
import Storages from "./pages/Storages";
import StorageDetails from "./pages/StorageDetails";
import PersonalData from "./pages/PersonalData";
import AdjustCalories from "./pages/AdjustCalories";
import AddFoodToDatabase from "./pages/AddFoodToDatabase";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { MealsProvider } from "./context/MealsContext";

import PrivateRoutes from "./components/PrivateRoutes";


function App() {
  // ($env:HTTPS = "true") -and (npm start)

  // TO-DOs!
  // Localstorage Location wird undefined manchmal, einfach schaun dass undefined nd gsetzt wird (wsl gefixed)
  // Storage pro location KANN AUCH INS MINUS GEHN dann gibts keine probleme beim deleten und danach wieda adden! (wsl gefixed)
  // Backend allgemein anpassen (wsl gefixed)
  // ChangeWeight im Backend muss wsl a no angepasst werden (wsl gefixed)
  // Macros changeable machen und ausrechnen im backend (wsl gefixed)
  // Paar Buttons zu submit buttons machn (wsl gefixed)
  // Storage Frontend Problem, wenn man was hinzufügt und des scho in da liste is wirds nd geaddet sondern ein neues objekt reingschmissn (wsl gefixed)
  // Storage Location hinzufügen lassen per frontend (wsl gefixed)
  // AddFoodToMeal gewicht wenns schon vorhanden ist in hinsicht auf meals (wsl gefixed)
  // AddFood im Frontend machen kuss (wsl gefixed)
  // findFood() mit off-docs überarbeiten (wsl gefixed)
  // Bei AddFood groß-klein nicht berükcischtigen (wsl gefixed)
  // Login in when register (wsl gefixed)
  // Backend Bugs fixed bezüglich storage 
  // 
  //
  // addFood - StoredFood wird visuell des doppelte geaddet und beim food auch - backend passt alles#
  // Liegt vlt daran dass MealsDetails schon einmal meals hat
  //
  //
  // Storage Bug ka zeigt falschen wert an gg, 
  //
  // MealTemplate iwi
  // 
  // food deleten UND im state auch storedFood wieda dazu tun
  //
  // Alles ausgrauen was no nd hinzugefügt wurde schon bissl verkackt beim foodweight
  //
  // Backend schauen, dass die zahln nd elendslang werdn
  //
  // Load right amount of meals with right names even if there is no MEALS this day ( maybe try to useEffect in meals with [] to set it )
  // Approach didnt work  -- maybe like below
  /*
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });
  */
  //

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <MealsProvider>
            <div className="App">
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/MealDetails/:id" element={<MealDetails />} />
                  <Route
                    path="/BarcodeScanner/:id"
                    element={<BarcodeScannerRework />}
                  />
                  <Route path="/AddFood/:id" element={<AddFood />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/FoodDetails" element={<FoodDetails />} />
                  <Route path="/Storages" element={<Storages />} />
                  <Route path="/StorageDetails/:location" element={<StorageDetails />} />
                  <Route path="/PersonalData" element={<PersonalData />} />
                  <Route path="/AdjustCalories" element={<AdjustCalories />} />
                  <Route path="/AddFoodToDatabase" element={<AddFoodToDatabase />} />
                </Route>

                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />

              </Routes>
            </div>
          </MealsProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
