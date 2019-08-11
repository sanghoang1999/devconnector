import React,{Fragment, useState}  from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
const Register = () => {
  const [formData, setFormData] =useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  });
  const {name,email,password,password2 } = formData; 
  const onChange = e => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const onSubmit = async e => {
    e.preventDefault();
    if(password!==password2) {
      console.log('Password do not match');
    }
    else {
      const newUser = {
        name,
        email,
        password,
      }
      try {
        const config = {
          headers: {
            "Content-Type":"application/json"
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:5000/api/users',body,config);
        if(res.data) {
          console.log(res.data);
        }

      } catch (error) {
        console.log(error.response.data);
      }
    }
  }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fa fa-user" aria-hidden="true"></i>
      Create Your Account</p>
      <form action="dashboard.html" className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name"
           name="name" value={name} onChange={e=> onChange(e)} required>
           </input>
        </div>
        <div className="form-group">
          <input type="email" name="email" value={email}  onChange={e=> onChange(e)} placeholder="Email Address" required></input>
          <small className="form-text">
            This site uses Gravatar, so
            if you want a profile image,
              use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" name="password" value={password}  onChange={e=> onChange(e)} placeholder="Name" minLength="6"></input>
        </div>
        <div className="form-group">
          <input type="password" name="password2" value={password2}  onChange={e=> onChange(e)} placeholder="Confirm Password" minLength="6"></input>
        </div>
        <input type="submit" value="Register" className="btn btn-primary "></input>
      </form>
      <p className="my-1">
        Already have an account?
        <Link to="/login"> Sign in</Link>
      </p>
    </Fragment>
  )
}

export default Register
