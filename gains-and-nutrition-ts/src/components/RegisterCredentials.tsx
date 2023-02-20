import React, { FormEvent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

type RegisterCredentialsProps = {
  changeActive: (value: number) => void;
  biologicalData: any;
};

const RegisterCredentials = ({changeActive,biologicalData}: RegisterCredentialsProps) => {
    const { signup } = useAuth();

    const { register, handleSubmit, formState: { errors, isValid, isDirty },} = useForm({ mode: "onTouched" });

    const putDataTogether = (data : Object) => {
        let objectToSend = biologicalData;

       Object.assign(objectToSend, data);

        signup(objectToSend);
    }

  return (
    <div className="RegisterCredentials">
      <form className="RegisterForm" onSubmit={handleSubmit(putDataTogether)}>
        <header className="RegisterHeader" onClick={() => changeActive(2)}>
          <ArrowBackIcon sx={{ fontSize: 35 }}></ArrowBackIcon>
        </header>
        <div className="RegisterTitleInput">
          <div className="RegisterTitle">Firstname</div>
          <input
            id="firstnameInput"
            className="RegisterInput"
            type="text"
            placeholder="Your Firstname"
            {...register("firstName", { required: true, minLength: 3})}
          />
          {errors.firstName && (
            <div className="RegisterInputError">Please check the Firstname</div>
          )}
        </div>
        <div className="RegisterTitleInput">
          <div className="RegisterTitle">
            E-Mail
          </div>
          <input
            id="EmailInput"
            className="RegisterInput"
            type="text"
            placeholder="Your E-Mail"
            {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
          />
          {errors.email && (
            <div className="RegisterInputError">Please check the Email</div>
          )}
        </div>
        <div className="RegisterTitleInput">
          <div className="RegisterTitle">
            Password
          </div>
          <input
            id="PasswordInput"
            className="RegisterInput"
            type="password"
            placeholder="Your Password"
            {...register("password", { required: true, minLength: 8})}
          />
          {errors.password && (
            <div className="RegisterInputError">Please check the Password</div>
          )}
        </div>
        <button type="submit" className="LoginButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterCredentials;
