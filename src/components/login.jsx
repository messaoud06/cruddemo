import { error_validation_username, error_validation_password } from '../utils/custom-messages';

import React, { useState } from 'react';
import { LoginInput, CustomLoader } from './common';
import { useForm } from 'react-hook-form';
import authService from '../service/auth-service';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../logo.svg'
import { wait } from '@testing-library/user-event/dist/utils';



export const Login = (props) => {

    const [credentials, setCredentials] = useState({
        username:"null", password: "null"
    });

    const [loginState, setLoginState] = useState({
        loading: false, token: null, error: null
    });

    const navigate = useNavigate();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();



    React.useEffect(() => {
        //register login fields for useForm validation
        function initValidationForm() {
            register("username" , { required: true });
            register("password" , { required: true });
        }

        initValidationForm();

        //init switch user remember
        //Helper.setItemCache('butterflyAdmin_rememberuser', checkRemember);
    }, [register]);


   //submit login form
   const submitLogin = () => {
    //e.preventDefault();
    loginAttempt();
    }

    function loginAttempt() {
        setLoginState({ ...loginState, loading: true, error: null });
        authService.login(credentials).then(result => {
            onLoginSuccess(result);
        }, failure => {
            onLoginFailed(failure);
        });
    }

    //on success case
    const onLoginSuccess = () => {
        setLoginState({ ...loginState, loading: false, error: null });
        
        navigate(`/home`);
    }

    //on failure login
    const onLoginFailed = (failure) => {
        setLoginState({ ...loginState, loading: false, error: failure })
    }


return (

    <div className="root-page-login">

            <div className="container">
                <div className="col-md-4 mx-auto" id="login-frame">
                <form onSubmit={handleSubmit(submitLogin)}>
                        <h4>Sign in</h4>

                        <br />
                        <LoginInput type="text" placeholder="Username" leftIcon="pi pi-user"
                            onChange={e => { setCredentials({ ...credentials, username: e.target.value }); setValue("username", e.target.value); }} />
                        <div className="error-msg">{errors.username && error_validation_username}</div>

                        <LoginInput type="password" placeholder="Password" leftIcon="pi pi-lock"
                            onChange={e => { setCredentials({ ...credentials, password: e.target.value }); setValue("password", e.target.value) }} />
                        <div className="error-msg">{errors.password && error_validation_password}</div>

                        <br />

                        {loginState.loading === true ?
                            <CustomLoader label='logging in...' /> :
                            <div className="col-md-12 text-center">
                                <button type="submit" id="login" className="btn btn-block btn-login">Submit</button>
                            </div>}

                        <br />
                        {loginState.error != null &&
                            <div className="col-md-12 text-center">
                                <span style={{ color: 'red' }}><i className="pi pi-times-circle" />&nbsp;{loginState.error}</span>
                            </div>}


                        <br />
                   

                    </form>
                </div>
            </div>
        </div>

    );
}