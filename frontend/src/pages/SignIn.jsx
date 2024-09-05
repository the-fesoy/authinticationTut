import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const signin = () => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const navigate = useNavigate();

  const handleChange = (name) => (e) => {
    setvalues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signin", {
        email,
        password,
      });
      if (response.data.success === true) {
        setvalues({ email: "", password: "" });
        toast.success("Account retrieved");
        console.log(response.data);
        navigate("/user/dashboard");
        if(typeof window !== "undefined")
        {
          localStorage.setItem("token" , JSON.stringify(response.data))
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(`An error occurred: ${err.response?.data?.message || err.message || "Unknown error"}`);
      
    }
  };

  return (
    <div>
      <Header />
      <div className="container custom_className pt-5">
        <h2 className="signup_title text-center">SIGN IN</h2>
        <form className=" col-sm-6 offset-3 pt-5 signin_form">
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form4Example2"
              className="form-control"
              onChange={handleChange("email")}
              value={email}
            />
            <label className="form-label" htmlFor="form4Example2">
              Email{" "}
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form4Example3"
              className="form-control"
              onChange={handleChange("password")}
              value={password}
            />
            <label className="form-label" htmlFor="form4Example3">
              Password
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block mb-4"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default signin;
