import { React, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, getAllTodos } from "../features/user/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, updateLoginInfo] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    { email: "", password: "" }
  );
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/register")}
      >
        Register User
      </button>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={loginInfo.email}
          onChange={(e) => updateLoginInfo({ email: e.target.value })}
        ></input>
      </div>
      <div>
        <label htmlFor="pass">Password (8 characters minimum):</label>
        <input
          type={isShown ? "text" : "password"}
          id="pass"
          name="password"
          minLength="8"
          required={true}
          value={loginInfo.password}
          onChange={(e) => updateLoginInfo({ password: e.target.value })}
        ></input>
      </div>
      <div>
        <label htmlFor="show">Show Password:</label>
        <input
          type="checkbox"
          id="isShown"
          name="isShown"
          value={isShown}
          onChange={() => setIsShown(!isShown)}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(login(loginInfo));
          dispatch(getAllTodos());
          navigate("/user-home");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
