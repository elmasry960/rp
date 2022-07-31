import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
AOS.init();

export default function Login({ decodeToken }) {
  let navigate = useNavigate();

  let [loginFlag, setLoginFlag] = useState(false);
  let [errorList, setError] = useState([]);
  let [register, setRegister] = useState([]);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUser(e) {
    let inputValue = e.target.value;
    let newUser = { ...user };
    newUser[e.target.id] = inputValue;
    setUser(newUser);
    setError([]);
  }

  async function subitForm(e) {
    e.preventDefault();
    setLoginFlag(true);

    let testValidate = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[a-z0-6]{4,}$/i)
        .required(),
    });

    let response = testValidate.validate(user, { abortEarly: false });

    if (response.error) {
      setError(response.error.details);
      setLoginFlag(false);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );

      if (data.status == 401) {
        setRegister(data.message);
        setLoginFlag(false);
      } else {
        localStorage.setItem("tkn", data.token);
        decodeToken();
        navigate("/rp");
      }
    }
  }

  return (
    <>
      <div className="position-absolute top-0 end-0 bottom-0 start-0 w-100 d-flex justify-content-center align-items-center ">
        <form className="w-50 m-auto" onSubmit={subitForm}>
          {errorList.map((error, index) => (
            <>
              <div key={index} className="alert alert-danger">
                {error.message}
              </div>
            </>
          ))}
          {register.length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{register}</div>
          )}
          <label data-aos="zoom-in" data-aos-duration="1500" className="my-2" htmlFor="email">Email</label>
          <input data-aos="zoom-in" data-aos-duration="1500" onChange={getUser} className="form-control" placeholder="Email" type="text" id="email"/>
          
          <label data-aos="zoom-in" data-aos-duration="2000" className="my-2" htmlFor="password">Password</label>
          <input data-aos="zoom-in" data-aos-duration="2000" onChange={getUser} className="form-control" placeholder="Password" type="password" id="password"/>

          <button data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="2500" className="btn btn-outline-info mt-3" >
            {loginFlag ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
