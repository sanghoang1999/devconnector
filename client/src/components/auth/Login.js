import React,{Fragment, useState}  from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [formData, setFormData] =useState({
    email:'',
    password:'',
  });
  const {email,password } = formData; 
  const onChange = e => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const onSubmit = async e => {
    e.preventDefault();
     {
      const newUser = {
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
        const res = await axios.post('http://localhost:5000/api/auth',body,config);
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
        Login
      </h1>
      <p className="lead"><i className="fa fa-user" aria-hidden="true"></i>
      Login</p>
      <form action="dashboard.html" className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
        </div>
        <div className="form-group">
          <input type="email" name="email" value={email}  onChange={e=> onChange(e)} placeholder="Email Address" required></input>
        </div>
        <div className="form-group">
          <input type="password" name="password" value={password}  onChange={e=> onChange(e)} placeholder="Name" minLength="6"></input>
        </div>
        <input type="submit" value="Register" className="btn btn-primary "></input>
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/register"> Sign up</Link>
      </p>
    </Fragment>
  )
}

export default Login
