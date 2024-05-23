import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });
      console.log(data);
      if (data.success === true) {
        setValues({ email: "", password: "" });
        alert("kirdi tzimga");
        navigate("/home");
        localStorage.setItem("token", JSON.stringify(data));
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data);
    }
  };
  return (
    <div className="container">
      <div className="row align-align-items-center">
        <div className="col-lg-6 offset-lg-3 offset-md-3 col-md-6 align-align-self-center mt-5">
          <form>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="example@gmail.com"
                onChange={handleChange("email")}
                value={email}
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
                onClick={handleSubmit}
                className="btn btn-primary"
              >
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
                <Link to="/signup" className="text-white">
                  SIGN UP?
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

export default SignIn;
