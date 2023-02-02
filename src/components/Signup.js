import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
export default function Signup() {
  const paperStyle = { padding: 20, height: '76vh', width: 300, margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

    const initialValues = {
        emailId: "",
        userName: "",
        mobile: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]:value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
        setFormErrors(validate(formValues));
        setIsSubmit(true);

      
        if(Object.keys(formErrors).length === 0 && isSubmit){
            
        
        fetch("http://localhost:5000/user",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(formValues)
      }).then((res)=>{
        alert('Registered successfully.')
        navigate('/Login');
      }).catch((err)=>{
        console.log(err.message)
      })
    }

    };

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }

    }, [formErrors]);
    const validate = (values) => {
        const errors ={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phoneno = /^\d{10}$/;
        if (!values.emailId){
            errors.emailId = "Email is required!";
        } else if (!regex.test(values.emailId)) {
            errors.email = "This is not a valid email format!";
          }
        if (!values.userName){
            errors.userName = "username is required!";
        }
        if (!values.mobile){
            errors.mobile = "Mobile Number is required!";
        } else if(!values.mobile.match(phoneno)){
            errors.mobile = "Mobile Number should be of 10 digit!";
        }
        if (!values.password){
            errors.password = "Password is required!";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
          } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
          }
        return errors;

    }


    return (
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2>Sign Up</h2>
          </Grid>

        <div className="container">
            <div className="row">
                <div className='col-24 '>
                    <form className="row g-3 m-4 rounded-pill" onSubmit={handleSubmit}>
                        {/* <h4>Sign Up</h4> */}
                        {/* <div className="col-12">
                            <input  
                                name="id" 
                                className="form-control" 
                                id="id" 
                                placeholder='Id' 
                                disabled='disabled'
                                value={formValues.id} 
                                onChange={handleChange} 
                            />
                        </div> */}
                        <div className="col-24">
                            <input 
                                type="email" 
                                name="emailId" 
                                className="form-control" 
                                id="emailId" 
                                placeholder='Email Id' 
                                value={formValues.emailId} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className='form-text error'>{formErrors.emailId}</div>
                        <div className="col-24">
                            <input 
                                type="text" 
                                name="userName" 
                                className="form-control" 
                                id="userName" 
                                placeholder='User Name' 
                                value={formValues.userName} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-text error'>{formErrors.userName}</div>
                        <div className="col-24">
                            <input 
                                type="Number" 
                                name="mobile" 
                                className="form-control" 
                                id="mobile" 
                                placeholder="Mobile Number" 
                                value={formValues.mobile} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className='form-text error'>{formErrors.mobile}</div>
                        <div className="col-24">
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password" 
                                value={formValues.password} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className='form-text error'>{formErrors.password}</div>
                        
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
                {/* <div className='col-24'></div> */}
            </div>
        </div>
        </Paper>
      </Grid>
    )
}