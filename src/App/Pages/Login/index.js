import * as React from "react";
import { Button, TextField, styled } from "@mui/material"; 

import "./styles.scss";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  function navigateToListaProblemas(){
    navigate("/lista-problemas");
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
        />
        <Input
          fullWidth
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          margin="normal"
        />
        <Button 
          onClick={navigateToListaProblemas}
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
