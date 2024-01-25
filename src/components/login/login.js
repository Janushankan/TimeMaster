import React, { useState } from "react";
import LoginImage from "../../assets/login.svg";
import Logo from "../../assets/logo.png";
import { validateLogin } from "../../utils/validation";
import FormHandler from "../../utils/FormHandler";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const CallbackFunction = () => {
    // Your logic for successful form submission
    console.log("Form submitted successfully!");
    toast.success(`Login successfully`)
    // Additional actions can be performed here, such as making API requests, updating state, etc.
  };

  const { handleChange, handleSubmit, setValue, initForm, values, errors } =
    FormHandler(CallbackFunction, validateLogin);

  function isLogin() { }

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: values.username,
        password: values.password,
      });

      // Assuming the API returns a token
      const authToken = response.data.token;

      // Save the token in local storage or state
      setToken(authToken);
      localStorage.setItem('token', authToken);
      // Redirect or perform any other action after successful login
      navigate("/", { state: { token: authToken } });

    } catch (error) {
      // Handle login failure, show error message, etc.
      console.error("Login failed", error);

      if (error.response) {
        const errorMessage = error.response.data.detail;
        setValue("error", errorMessage);
      } else if (error.request) {
        setValue("error", "Network error. Please try again.");
      } else {
        setValue("error", "An unexpected error occurred. Please try again.");
      }

      // Set loginError to display the error message
      setLoginError("Invalid Username or Password. Please try again.");
      toast.error(`Invalid Username or Password`)
    }
  };
  return (
    <div
      className={
        "vh-100 d-flex align-items-center justify-content-center login"
      }
    >
      <div className="row m-0">
        <div className={"col-md-6 mx-auto"}>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className={
                "login-image img-responsive d-block align-items-center"
              }
              src={LoginImage}
              alt=""
            />
          </div>
        </div>
        <div
          className={
            "col-md-6 d-flex align-items-center justify-content-center"
          }
        >
          <div className={"container-widget"}>
            <div className="login-form-inner">
              {loginError && (
                <p className="text-red text-center">{loginError}</p>
              )}
              <form action="#">
                <div className="d-flex align-items-center">
                  <img
                    className={"login-logo d-block mx-auto img-fluid"}
                    src={Logo}
                    alt=""
                  />
                </div>
                <h1 className="brand-text text-center">Time Master</h1>
                <div className="login-field">
                  <input
                    className={`form-control ${errors.username ? "border-red" : ""}`}
                    type="text"
                    name={"username"}
                    onChange={(e) => handleChange(e)}
                    placeholder="Username"
                  />
                </div>
                {errors.username && (<p className={"text-red"}>{errors.username}</p>)}
                <div className="login-field">
                  <input
                    className={`form-control ${errors.password ? "border-red" : ""}`}
                    type="password"
                    name={"password"}
                    onChange={(e) => handleChange(e)}
                    placeholder="Password"
                  />
                </div>
                {errors.password && (<p className={"text-red"}>{errors.password}</p>)}
                <div className="py-3 text-start">

                </div>
                <div className="login-btn d-grid">
                  <button
                    type="button"
                    className={"btn btn-secondary tasks-dropdown-btn flex-end"}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                {values.error && <p className={"text-red"}>{values.error}</p>}

                <div className="py-3 text-start">
                  <Link
                    to="/signup"
                    className="login-forgot text-decoration-underline"
                  >
                    Create an account
                  </Link>
                </div>

                {values.error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {values.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
