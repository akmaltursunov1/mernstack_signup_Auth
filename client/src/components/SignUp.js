import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
      console.log(error.response.data.message);

      alert(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="row align-align-items-center">
        <div className="col-lg-6 offset-lg-3 offset-md-3 col-md-6 align-align-self-center mt-5">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>Ismini kiritish</label>
              <input
                name="username"
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
                name="email"
                id="emailInput"
                onChange={handleChange("email")}
                value={email}
                required
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                name="password"
                onChange={handleChange("password")}
                value={password}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div
              className="div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <p className="forgot-password text-white">
                Ro'yxatdan o'tish{" "}
                <Link to="/signin" className="text-white">
                  SIGN IN?
                </Link>
              </p>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
