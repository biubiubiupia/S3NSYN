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

  const validate = () => {
    let valid = true;
    let errors = {}; // Reset the errors object
  
    // Name validation
    if (!formData.name) {
      errors.name = 'Name is required';
      valid = false;
    }
  
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }
  
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';}
      else if (formData.password.length < 6) {
        errors.password = 'Passwords need to be at least 6 characters';}
      }
      valid = false;
    }
  
    // Confirm password validation
    if (!formData.confirm) {
      errors.confirm = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirm) {
      errors.confirm = 'Passwords do not match';
      valid = false;
    }
  
    setErrors(errors); // Set errors only for fields with issues
    return valid; // Return whether the form is valid
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Handle Submit Function
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
          name="pasword"
          id="password"
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
