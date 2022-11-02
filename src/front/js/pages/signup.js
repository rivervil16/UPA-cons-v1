import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import fondo_signup from "./../../img/fondo_signup.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, set_repeatPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    actions.signup(email, password).then((resp) => {
      if (resp) {
        navigate("/favoritos");
      }
    });
  };

  return (
    <div
      id="div_fondo"
      style={{ backgroundImage: `url(${fondo_signup})`, height: "490px" }}
    >
      <div className="text-center" id="div_signup">
        <h1>Registrarse</h1>
        <div>
          <div className="text-center">
            <input
              className="m-1 group-text text-center rounded-pill"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="m-1 group-text text-center rounded-pill"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="m-1 group-text text-center rounded-pill"
              type="password"
              placeholder="Constraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="m-1 group-text text-center rounded-pill"
              type="password"
              placeholder="Repetir constraseña"
              value={repeat_password}
              onChange={(e) => set_repeatPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-secondary text-white text-center mt-2"
            onClick={handleClick}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};
