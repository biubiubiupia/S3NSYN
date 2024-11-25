import "./SignupForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function SignupForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const validate = (field) => {
    let valid = true;
    let errors = {}; // Reset errors
  
    // Only validate the specified field, or validate all if none is passed
    if (!field || field === "name") {
      if (!formData.name) {
        errors.name = 'Name is required';
        valid = false;
      }
    }
  
    if (!field || field === "email") {
      if (!formData.email) {
        errors.email = 'Email is required';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        valid = false;
      }
    }
  
    if (!field || field === "password") {
      if (!formData.password) {
        errors.password = 'Password is required';
        valid = false;
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        valid = false;
      }
    }
  
    if (!field || field === "confirm") {
      if (!formData.confirm) {
        errors.confirm = 'Please confirm your password';
        valid = false;
      } else if (formData.password !== formData.confirm) {
        errors.confirm = 'Passwords do not match';
        valid = false;
      }
    }
  
    setErrors(errors); // Set errors only for affected fields
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    validate(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.confirm.value,
    };

    if (validate()) {
      try {
        const response = await axios.post(`${BASE_URL}/signup`, formData);
        console.log("Signed up successfully!");
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        setFormData({
          name: "",
          email: "",
          password: "",
          confirm: "",
        });
        navigate("/guide");
      } catch (error) {
        console.error("Error signing up", error);
      }
    }
  };

  return (
    <form className="signup__form" onSubmit={handleSubmit}>
      <div className="signup__group">
        <label className="label signup__label" htmlFor="name">
          your name.
        </label>
        <input
          className={`signup__input ${errors.name ? "input--error" : "signup__input--valid"}`}
          placeholder="name"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        ></input>
        {errors.name && <span className="signup__error">{errors.name}</span>}
      </div>

      <div className="signup__group">
        <label className="label signup__label" htmlFor="email">
          your email.
        </label>
        <input
          className={`signup__input ${errors.email ? "input--error" : "signup__input--valid"}`}
          placeholder="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        {errors.email && <span className="signup__error">{errors.email}</span>}
      </div>

      <div className="signup__group">
        <label className="label signup__label" htmlFor="password">
          your password.
        </label>
        <input
          className={`signup__input ${errors.password ? "input--error" : "signup__input--valid"}`}
          type="password"
          placeholder="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        {errors.password && (
          <span className="signup__error">{errors.password}</span>
        )}
      </div>

      <div className="signup__group">
        <label className="label signup__label" htmlFor="confirm">
          confirm password.
        </label>
        <input
          className={`signup__input ${errors.confirm ? "input--error" : "signup__input--valid"}`}
          type="password"
          name="confirm"
          placeholder="password"
          value={formData.confirm}
          onChange={handleChange}
        ></input>
        {errors.confirm && (
          <span className="signup__error">{errors.confirm}</span>
        )}
      </div>

      <button className="button-dark singup__button" type="submit">
        GET STARTED
      </button>
    </form>
  );
}

export default SignupForm;
