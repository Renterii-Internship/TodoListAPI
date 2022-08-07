import { React, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../features/user/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerInfo, updateRegisterInfo] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    { name: "", email: "", password: "", age: 0 }
  );
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Back
      </button>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={registerInfo.name}
          onChange={(e) => updateRegisterInfo({ name: e.target.value })}
        ></input>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={registerInfo.email}
          onChange={(e) => updateRegisterInfo({ email: e.target.value })}
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
          value={registerInfo.password}
          onChange={(e) => updateRegisterInfo({ password: e.target.value })}
        ></input>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={registerInfo.age}
          onChange={(e) => updateRegisterInfo({ age: e.target.value })}
        ></input>
      </div>
      <div>
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
        onClick={() => dispatch(register(registerInfo))}
      >
        Register
      </button>
    </div>
  );
}

export default SignUp;
