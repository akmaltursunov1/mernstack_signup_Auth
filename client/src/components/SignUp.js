import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { userName, email, password } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5001/user/register", {
        userName,
        email,
        password,
      });
      console.log(data);
      if (data.success === true) {
        setValues({ userName: "", email: "", password: "" });
        alert("success register");
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };
  return (
    <div className="container">
      <div className="row align-align-items-center">
        <div className="col-lg-6 offset-lg-3 offset-md-3 col-md-6 align-align-self-center mt-5">
          <form>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>Ismini kiritish</label>
              <input
                onChange={handleChange("userName")}
                value={userName}
                type="text"
                className="form-control"
                placeholder="ismingizni yozing..."
              />
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                onChange={handleChange("email")}
                value={email}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            {/* <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div> */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
