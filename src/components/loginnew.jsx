
import React from "react";

import { LoginForm } from "./loginForm";
import { RegisterFrom } from "./registerForm";

export const LoginNew = (props) => {

  return (
    <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

      <LoginForm />
      <RegisterFrom/>
      
    </div>
  );
};
