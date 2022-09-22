import {
    error_validation_username,
    error_validation_password,
    error_validation_email,
  } from "../utils/custom-messages";
  
  import React, { useState } from "react";
  import { LoginInput, CustomLoader, DropdownCustom } from "./common";
  import { useForm } from "react-hook-form";
  import authService from "../service/auth-service";
  import { Navigate, useNavigate } from "react-router-dom";

  
  export const LoginForm = (props) => {

    const [credentials, setCredentials] = useState({
        username: "null",
        password: "null",
      });


      const [loginState, setLoginState] = useState({
        loading: false,
        token: null,
        error: null,
      });
    
      const navigate = useNavigate();
    
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
    
    
      React.useEffect(() => {
        //register login fields for useForm validation
        function initValidationForm() {
          register("username", { required: true });
          register("password", { required: true });
    
    
        }
    
        initValidationForm();
    
    
      }, [register]);
    
      //submit login form
      const submitLogin = () => {
        //e.preventDefault();
        loginAttempt();
      };
    
    
      function loginAttempt() {
        setLoginState({ ...loginState, loading: true, error: null });
        
        authService.login(credentials).then(
          (result) => {
            onLoginSuccess(result);
            console.log(result);
          },
          (failure) => {
            onLoginFailed(failure);
          }
        );
    
      }


      //on success case
  const onLoginSuccess = () => {
    setLoginState({ ...loginState, loading: false, error: null });
    

    navigate(`/home`);
  };

  //on failure login
  const onLoginFailed = (failure) => {
    console.log(failure);
    setLoginState({ ...loginState, loading: false, error: failure });
  };


  return(

        <div className="login">
        <form onSubmit={handleSubmit(submitLogin)} key='form-step-1'>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <br />
          {loginState?.error !== null && <h5 className="error"> {loginState?.error} </h5>}
          
          <LoginInput
            type="text"
            placeholder="Username"
            leftIcon="pi pi-user"
            myClass="login-icon"
            onChange={(e) => {
              setCredentials({ ...credentials, username: e.target.value });
              setValue("username", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors.username && error_validation_username}
          </div>

          <LoginInput
            type="password"
            placeholder="Password"
            leftIcon="pi pi-lock"
            myClass="login-icon"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
              setValue("password", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors.password && error_validation_password}
          </div>

          <button>Login</button>
        </form>
      </div>



  );
    
  
}