import * as React from "react";
import {useState, useEffect, useContext} from 'react'
import { Button, TextField, styled } from "@mui/material"; 

import "./styles.scss";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

import loginImg from "../../Assets/login-img.svg";

const Input = styled(TextField)`
  & label {
    color: #9E7D9E;
    backgroundColor: red;
  }

  & label.Mui-focused {
    color: #9E7D9E;
  }

  & .MuiOutlinedInput-root {
    color: #9E7D9E;
    & fieldset {
      border-color: #9E7D9E;
    }
    &:hover fieldset {
      border-color: #9E7D9E;
    }
    &.Mui-focused fieldset {
      border-color: #9E7D9E;
    }
  }
`

function Login() {

  const userCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const getUsers= async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  },[]);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { setAuth, auth, userId, setUserId } = useContext(AuthContext);

  const handleName = event =>{
    setName(event.target.value);
  }
  const handleEmail = event =>{
    setEmail(event.target.value);
  }

  function verifyUser(){
    let found = false;
    let UID = undefined;
    users.map(user=>{
      if(user.nome==name && user.email==email){
        found = true;
        UID = user.id;
      }
    });
    if(found==true){
      setAuth(true);
      setUserId(UID);
      navigate("/lista-problemas");
    }else{
      alert("Usuário não encontrado!");
    }
  }


  return (
    <div className="login-container">
      <h1>Bem-vindo!</h1>
      <img
        src={loginImg}
        alt="ilustração de um fastama, utilizado como avatar"
      />
      <div className="login-info">
        <Input
          fullWidth
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          margin="normal"
          onChange={handleName}
        />
        <Input
          fullWidth
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          margin="normal"
          onChange={handleEmail}
        />
        <Button 
          onClick={verifyUser}
          variant="contained" 
          sx={[
            { 
            borderRadius: '50px',
            width: 3/4,
            height: '50px',
            margin: '25px 0',
            fontFamily: 'Lato', 
            fontSize: '18px',
            fontWeight: '600',
            backgroundColor: '#6997DC',
            color: '#202020',
            letterSpacing: '5px',
            fontFamily: 'Lato',

            ":hover": {
              backgroundColor: "#47B39D",
            }
            }
          ]}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default Login;
