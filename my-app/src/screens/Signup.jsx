import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_SIGNUP } from "../Utils/APIs";

const Signup = () => {
  const auth = localStorage.getItem("authToken");

  useEffect(() => {
    if (auth) navigate("/");
  });
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name: credential.name,
      email: credential.email,
      password: credential.password,
      address: credential.address,
    };

    try {
      const response = await axios.post(API_SIGNUP, formData);

      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("user", response.data.user);
        toast.success("Registered ✅");
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 409) {
        toast.error("Already Registered with this Email");
      } else {
        toast.error("Signup Failed");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };
  return (
    <>
      <div className="w-full h-[82vh] flex justify-center items-center">
        <form
          className="lg:w-2/6 md:w-2/4 w-4/6  text-white"
          onSubmit={submitHandler}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control outline-none"
              name="name"
              placeholder="Enter your fullName"
              value={credential.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control outline-none"
              name="email"
              placeholder="Enter your Email"
              value={credential.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control outline-none"
              name="password"
              placeholder="Password"
              value={credential.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Your Address
            </label>
            <input
              type="text"
              name="address"
              className="form-control outline-none"
              placeholder="Enter your Address"
              value={credential.address}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded font-semibold"
          >
            Sign Up
          </button>
          <Link
            to={"/login"}
            className="ml-4 text-red-500 px-4 py-2 rounded font-semibold"
          >
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
