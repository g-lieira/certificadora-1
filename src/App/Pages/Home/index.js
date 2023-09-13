import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router";
import homepagephoto from '../../Assets/Homepage.png'



const Home = () => {

    const navigate = useNavigate();
    function navigateToLogin(){
        navigate("/login");
      }

    return(
      <>
      <div className="pageContainer">
        <div>
            <h1>Bem-Vindo!</h1>
            <button onClick={navigateToLogin}><h2>C O M E Ç A R</h2></button>
        </div>
        <img src={homepagephoto} alt="Ilustração" />
      </div>
      <div className="loginPage">

      </div>
      </>
    )
  }
  
  export default Home;
  