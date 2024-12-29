import "./LoginForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    serverError: "",
  });

  const validate = (field) => {
    let valid = true;
    let errors = {};

    if (!field || field === "email") {
      if (!formData.email) {
        errors.email = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
        valid = false;
      }
    }

    if (!field || field === "password") {
      if (!formData.password) {
        errors.password = "Password is required";
        valid = false;
      }
    }

    setErrors(errors); // Set errors only for affected fields
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(`${BASE_URL}/login`, formData);
        console.log("Logged in successfully!");
        localStorage.setItem("authToken", response.data.token);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error logging in", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: error.response?.data || "An error occurred",
        }));
        console.log(errors);
      }
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__group">
        <label className="label login__label" htmlFor="email">
          your email.
        </label>
        <input
          className={`login__input ${
            errors.email ? "input--error" : "login__input--valid"
          }`}
          placeholder="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        {(errors.email || (errors.serverError === "User does not exist")) && (
          <span className="login__error">{errors.email || errors.serverError}</span>
        )}
      </div>

      <div className="login__group">
        <label className="label login__label" htmlFor="password">
          your password.
        </label>
        <input
          className={`login__input ${
            errors.password ? "input--error" : "login__input--valid"
          }`}
          type="password"
          placeholder="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        {(errors.password || (errors.serverError === "Password incorrect")) && (
          <span className="login__error">
            {errors.password || errors.serverError}
          </span>
        )}
      </div>

      <button className="button-dark login__button" type="submit">
        LOGIN
      </button>
    </form>
  );
}

export default LoginForm;
