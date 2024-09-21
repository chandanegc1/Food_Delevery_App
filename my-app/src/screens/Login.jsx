import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_LOGIN } from "../Utils/APIs";

const Login = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      email: credential.email,
      password: credential.password,
    };
    try {
      const response = await axios.post(API_LOGIN, formData);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Logged In ✅");
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Invalid Email");
      } else if (err.response?.status === 401) {
        toast.error("Enter Correct Password");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <div>
      <div className="w-full h-[82vh] flex justify-center items-center">
        <form
          className="lg:w-2/6 md:w-2/4 w-4/6 text-white"
          onSubmit={submitHandler}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control outline-none"
              name="email"
              placeholder="Enter your Registered Email"
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
              placeholder="password"
              value={credential.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded font-semibold"
          >
            Login
          </button>
          <Link
            to={"/signup"}
            className="ml-4 text-red-500 px-4 py-2 rounded font-semibold"
          >
            New User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
