import React, { createContext, FormEvent, useContext, useState} from "react";
import Cookies from 'universal-cookie';
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export type AuthContentType = {
  login: (e: FormEvent<HTMLFormElement>) => void;
  signup: (object: Object) => void;
  logout: () => void;
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContentType>({
  login: () => {},
  signup: () => {},
  logout: () => {},
  auth: null,
  setAuth: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(()=> localStorage.getItem('authTokens') ? (localStorage.getItem('authTokens'))! : null);
  const cookies = new Cookies();

  const navigate = useNavigate();

 

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target) {
      return alert("Something went wrong!");
    }

    let res= await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: (e.target as HTMLFormElement).email.value,
        password: (e.target as HTMLFormElement).password.value,
      }),
    });

    const data = await res.json()
    
    if(res.status === 200){
      cookies.set('auth-token', data); //AM besten httponly //Noch einmal zeit setzen
      const decodedData : any = jwt_decode(data);
      setAuth(jwt_decode(data));
      localStorage.setItem('authTokens', decodedData.iat);
      console.log(decodedData);
      navigate("/");
    }else{
      alert(data);
    }
  };

  const signup = async (object: Object) => {

    let res= await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        object
      ),
    });

    const data = await res.json()

    if(res.status === 200){
      cookies.set('auth-token', data);
      const decodedData : any = jwt_decode(data);
      setAuth(jwt_decode(data));
      localStorage.setItem('authTokens', decodedData.iat);
      navigate("/");
    }else{
      console.log(data);
    }
  };

  const logout = () => {
    cookies.remove('auth-token');
    localStorage.removeItem('authTokens');
    setAuth(null);
    navigate('/login');
  };


  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        signup,
        logout,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
