import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";

const initialFormData = {
  username: "",
  fullName: "",
  mobileNumber: "",
  age: "",
  email: "",
  country: "Select Country",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  username: "",
  fullName: "",
  mobileNumber: "",
  age: "",
  email: "",
  country: "",
  password: "",
  confirmPassword: "",
};

const countries = ["Palestine", "Jordan", "Egypt", "Turkey", "Saudi Arabia"];

const SignUpForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    //form validator
    let valid = true;
    const newErrors = { ...initialErrors };

    if (
      formData.username.length < 3 ||
      !/^[a-zA-Z0-9-_@]+$/.test(formData.username)
    ) {
      newErrors.username = "Username must be at least 3 characters.";
      valid = false;
    }

    if (formData.fullName.length < 3 || formData.fullName.length > 15) {
      newErrors.fullName = "Full name must be between 3 and 15 characters.";
      valid = false;
    }

    if (!/^05\d{8}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber =
        "Mobile number must start with 05 and have a length of 10 numbers.";
      valid = false;
    }

    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      newErrors.age = "Age must be between 18 and 100.";
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Must be a valid email address.";
      valid = false;
    }

    if (formData.country === "Select Country") {
      newErrors.country = "Please select a country.";
      valid = false;
    }

    if (
      formData.password.length < 6 ||
      formData.password.length > 24 ||
      !/[A-Za-z0-9].*[!@#$%^&*()_+]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be 6 to 24 and contain letters, numbers, and a special char.";
      valid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords must match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Sign up successful!");
      setFormData(initialFormData); //clear form input after saving successfuly
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // setTimeout to reset success msg after 3 seconds
    }
  };

  const handleClear = () => {
    //clear form inputs to initial if "clear" button is pressed
    setFormData(initialFormData);
    setErrors(initialErrors);
    setSuccessMessage("Form Cleared");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Sign Up</h2>
        <Link className="Link" to={"/api"}>
          to API
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <p className="error">{errors.username}</p>
        </div>
        <div className="input">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          <p className="error">{errors.fullName}</p>
        </div>
        <div className="input">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
          />
          <p className="error">{errors.mobileNumber}</p>
        </div>
        <div className="input">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <p className="error">{errors.age}</p>
        </div>
        <div className="input">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <p className="error">{errors.email}</p>
        </div>
        <div className="input">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            <option>Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p className="error">{errors.country}</p>
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <p className="error">{errors.password}</p>
        </div>
        <div className="input">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <p className="error">{errors.confirmPassword}</p>
        </div>
        <div className="buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default SignUpForm;
