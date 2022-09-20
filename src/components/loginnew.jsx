import {
  error_validation_username,
  error_validation_password,
} from "../utils/custom-messages";

import React, { useState } from "react";
import { LoginInput, CustomLoader, DropdownCustom } from "./common";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import authService from "../service/auth-service";
import registerService from "../service/register-service";
import { Navigate, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

export const LoginNew = (props) => {
  const citySelectItems = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];

  const [credentials, setCredentials] = useState({
    username: "null",
    password: "null",
  });

  const [registration, setRegistration] = useState({
    username: "null",
    password: "null",
    email:"null",
  });

  const [city, setCity] = useState();

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

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue : {setValue:setValue2},
    formState: { errors: errors2 },
  } = useForm();

  React.useEffect(() => {
    //register login fields for useForm validation
    function initValidationForm() {
      register("username", { required: true });
      register("password", { required: true });

      register2("username", { required: true });
      register2("password", { required: true });
      register2("email", { required: true });

    }

    initValidationForm();


  }, [register,register2]);

  //submit login form
  const submitLogin = () => {
    //e.preventDefault();
    loginAttempt();
  };

  const submitRegistration = () => {
    registerAttempt();
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

    setCredentials({...credentials, username:"null",password:"null"});
  }


  function registerAttempt(){

    setLoginState({ ...loginState, loading: true, error: null });

    registerService.register(registration).then(
      (result) => {
        onLoginSuccess(result);
        console.log(result);
      },
      (failure) => {
        onLoginFailed(failure);
      }
    );

    setRegistration({username:"null",password:"null",email:"null"});
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

  return (
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="login">
        <form onSubmit={handleSubmit(submitLogin)}>
          <label for="chk" aria-hidden="true">
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

      <div class="signup">
      <form onSubmit={handleSubmit2(submitRegistration)}>
          <label for="chk" aria-hidden="true">
            Sign up
          </label>
          <br/>
          {loginState?.error !== null && <h5 className="error"> {loginState?.error} </h5>}
          <LoginInput
            type="text"
            placeholder="Username"
            leftIcon="pi pi-user"
            myClass="registration-input"
            onChange={(e) => {
              setRegistration({ ...registration, username: e.target.value });
              setValue2("username", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors2.username && error_validation_username}
          </div>

          <LoginInput
            type="text"
            placeholder="Mail"
            leftIcon="pi pi-inbox"
            myClass="registration-input"
            onChange={(e) => {
              setRegistration({ ...registration, email: e.target.value });
              setValue2("email", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors2.username && error_validation_username}
          </div>

          <LoginInput
            type="password"
            placeholder="Password"
            leftIcon="pi pi-lock"
            myClass="registration-input"
            onChange={(e) => {
              setRegistration({ ...registration, password: e.target.value });
              setValue2("password", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors2.password && error_validation_password}
          </div>
            {/* 
            <DropdownCustom
                        value={city}
                        items={citySelectItems}
                        onChange={(e) => setCity(e.value)}
                        myClass="registration-input"
                        leftIcon="pi pi-lock"
                        placeholder="Select a City"
                    />

            */} 
          
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};
