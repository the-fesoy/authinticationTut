import { /* React,*/ useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
const SignUp = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = values;

  const handleChange = (name) => (e) => {
    setvalues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success === true) {
        setvalues({ name: "", email: "", password: "" });
        toast.success("Account successfuly made, log in bitch");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "An error occurred: " +
          (err.response?.data?.message || err.message || "Unknown error")
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container custom_className pt-5">
        <h2 className="signup_title text-center">SIGN UP</h2>
        <form className=" col-sm-6 offset-3 pt-5 signup_form">
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form4Example1"
              className="form-control"
              onChange={handleChange("name")}
              value={name}
            />
            <label className="form-label" htmlFor="form4Example1">
              Name
            </label>
          </div>

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

export default SignUp;
