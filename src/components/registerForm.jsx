import {
    error_validation_username,
    error_validation_password,
    error_validation_email,
  } from "../utils/custom-messages";
  
  import React, { useState } from "react";
  import { LoginInput, CustomLoader, DropdownCustom } from "./common";

  import { useForm } from "react-hook-form";
  import authService from "../service/auth-service";
  import registerService from "../service/register-service";
  import { Navigate, useNavigate } from "react-router-dom";



  export const RegisterFrom = (props) => {


          const [registration, setRegistration] = useState({
            username: "null",
            password: "null",
            email:"null",
          });
    
    
          const [registerState, setRegisterState] = useState({
            loading: false,
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
              register("email", { required: true });
        
        
            }
        
            initValidationForm();
        
        
          }, [register]);



          const submitRegistration = () => {
            registerAttempt();
          };
        
        
    
    
          //on success case
      const onRegistrationSuccess = () => {
        setRegisterState({ ...registerState, loading: false, error: null });
        
    
        navigate(`/`);
      };
    
      //on failure login
      const onRegistrationFailed = (failure) => {
        console.log(failure);
        setRegisterState({ ...registerState, loading: false, error: failure });
      };


      function registerAttempt(){

        setRegisterState({ ...registerState, loading: true, error: null });
    
        registerService.register(registration).then(
          (result) => {
            onRegistrationSuccess(result);
            console.log(result);
          },
          (failure) => {
            onRegistrationFailed(failure);
          }
        );
    
      }


    return (

        <div className="signup">
          <form onSubmit={handleSubmit(submitRegistration)} key='form-step-2'>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <br/>
          {registerState?.error !== null && <h5 className="error"> {registerState?.error} </h5>}
          <LoginInput
            type="text"
            placeholder="Username"
            leftIcon="pi pi-user"
            myClass="registration-input"
            onChange={(e) => {
              setRegistration({ ...registration, username: e.target.value });
              setValue("username", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors.username && error_validation_username}
          </div>

          <LoginInput
            type="text"
            placeholder="Mail"
            leftIcon="pi pi-inbox"
            myClass="registration-input"
            onChange={(e) => {
              setRegistration({ ...registration, email: e.target.value });
              setValue("email", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors.email && error_validation_email}
          </div>

          <LoginInput
            type="password"
            placeholder="Password"
            leftIcon="pi pi-lock"
            myClass="registration-input"
            msgvalidation="'Username field is required"
            onChange={(e) => {
              setRegistration({ ...registration, password: e.target.value });
              setValue("password", e.target.value);
            }}
          />
          <div className="error-msg">
            {errors.password && error_validation_password}
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

    );

  }