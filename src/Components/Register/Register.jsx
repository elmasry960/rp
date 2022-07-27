import React, { useState } from 'react'
import Joi from "joi";
import axios from 'axios';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let navigate = useNavigate()

  let [errorList , setError] = useState([])
  let [register , setRegister] = useState([])
  let [user , setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age:0
  } );

  function getUser(e){
      let inputValue = e.target.value;
      let newUser = {...user};
      newUser[e.target.id] = inputValue
      setUser(newUser);

      console.log(newUser)

      setError([])
      
  }

  async function subitForm(e){
    e.preventDefault();
    let testValidate = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(20).required(),
      last_name: Joi.string().alphanum().min(3).max(20).required(),
      age: Joi.number().min(18).max(60).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
      password: Joi.string().pattern(/^[a-z0-9]{5,}$/i).required() 
    });
    
    let response = testValidate.validate(user , {abortEarly: false})

    if(response.error){
      setError(response.error.details)
    }
    else{

      let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup" , user)
      console.log(data);
      
      if(data.errors){
          setRegister(data.message)
      }
      else{
        navigate("/login")
      }

    }

  }

  return <>
  
  <div className='position-absolute mt-5 top-0 end-0 bottom-0 start-0 w-100 d-flex justify-content-center align-items-center '>
    <form className='w-50 m-auto mt-3' onSubmit={subitForm}>

    {errorList.map((error , index)=> <>
        <div key={index} className='alert alert-danger'>{error.message}</div>
      </>)}
     {register.length == 0? '': <div className='alert alert-danger'>{register}</div>}
      <label className='my-2' htmlFor='first_name'>First Name</label>
      <input onChange={getUser} className='form-control' placeholder='First Name' type="text" id="first_name"/>

      <label className='my-2' htmlFor='last_name'>Last Name</label>
      <input onChange={getUser} className='form-control' placeholder='Last Name' type="text" id="last_name"/>
      
      <label className='my-2' htmlFor='age'>Age</label>
      <input onChange={getUser} className='form-control' placeholder='Age' type="number" id="age"/>

      <label className='my-2' htmlFor='email'>Email</label>
      <input onChange={getUser} className='form-control' placeholder='Email' type="text" id="email"/>

      <label className='my-2' htmlFor='password'>Password</label>
      <input onChange={getUser} className='form-control' placeholder='Password' type="password" id="password"/>

      <button className='btn btn-outline-info mt-3'>Register</button>

    </form>

  </div>
  
  
  
  </>
}
