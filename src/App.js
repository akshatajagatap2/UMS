// import './App.css';
// import Header from "./components/Header";

// import Signup from "./components/Signup";
// import Footer from "./components/Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <>
//     <Header/>
//     <Signup/>
//     <Footer/>
//     </>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
// import SignInOutContainer from './Container';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import EmpListing  from "./components/Employee/EmpListing";
// import { Container } from '@material-ui/core';
import EmpCreate from "./components/Employee/EmpCreate";
import EmpDetail from "./components/Employee/EmpDetails";
import EmpEdit from "./components/Employee/EmpEdit";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (

      
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/employee/list' element={<EmpListing />}></Route>
          <Route path='/employee/create/' element={<EmpCreate />}></Route>
          <Route path='/employee/detail/:empid' element={<EmpDetail />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
  );
  
} 

export default App;

