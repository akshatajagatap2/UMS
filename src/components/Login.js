import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

export default function Login() {
  const paperStyle = { padding: 20, height: '73svh', width: 300, margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
    const initialValues = {
        emailId: "",
        password: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [empdata, empdatachange] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let isValid = false;
    let id = "";
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        console.log(empdata)
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        if(Object.keys(formErrors).length === 0 && isSubmit){

            for (let i = 0; i < empdata.length; i++) {
                for (let j = 0; j < 5; j++) {
                    if (empdata[i].emailId === (formValues.emailId) && empdata[i].password === (formValues.password)) {
                        isValid = true;
                        id = '{empdata[i].id}'
                        console.log("I am correct")
                        break;
                    }
                }
                if (isValid) {
                    break;
                }
            }
    
            if (isValid) {
                navigate("/employee/list")
            } else {
                alert("Email or Password is wrong")
                navigate('/Login')
    
            }

        }
        

    }

    useEffect(() => {
        fetch("http://localhost:5000/user").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }

    }, [formErrors]);

    const validate = (values) => {
        const errors = {};

        if (!values.emailId) {
            errors.emailId = "Email is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        return errors;

    }

    const nav = useNavigate();

    const redirectList = (provider,data) =>{
      console.log(provider,data)
      if (data !==null){
        nav('/employee/list')
      }
    }

    return (
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2>Sign In</h2>
          </Grid>
          <div className="container ">
            <div className="row">
              <div className="col-24"></div>
              {/* <div className='col-4 border'> */}
              <form className="col g-3 m-4" onSubmit={handleSubmit}>
                <div className="col-24">
                  <input
                    type="email"
                    name="emailId"
                    className="form-control"
                    id="emailId"
                    placeholder="Email Id"
                    onChange={handleChange}
                    fullwidth
                  />
                </div>
                <div className="form-text error">{formErrors.emailId}</div>
                <div className="col-24">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-text error">{formErrors.password}</div>
                <p />
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-primary" fullwidth>
                    Login
                  </button>
                  <p />
                  <NavLink
                    to="/Signup"
                    onClick={() => handleChange("event", 1)}
                  >
                    Sign Up
                  </NavLink>
                </div>
              </form>
              <div className="col-md-12 text-center">
                <p>
                  <b>   OR LOGIN USING  </b>
                </p>
              </div>
              <div className="col-24"></div>
            </div>
            <LoginSocialGoogle
              client_id={
                "390911673158-k14nl9jnv61ds6tdcs0b5bvth8695rm7.apps.googleusercontent.com"
              }
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }) => {
                // console.log(provider, data);
                redirectList(provider, data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </div>
        </Paper>
      </Grid>
    );
}