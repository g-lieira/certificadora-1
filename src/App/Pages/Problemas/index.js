import * as React from "react";
import { Button, TextField, styled, Avatar } from "@mui/material";
import { useNavigate } from "react-router";

import "./styles.scss";

import AvatarImg from "../../Assets/login-img.svg";

const Input = styled(TextField)`
  & label {
    color: #ffc153;
    backgroundcolor: red;
  }

  & label.Mui-focused {
    color: #ffc153;
  }

  & .MuiOutlinedInput-root {
    color: #ffc153;
    & fieldset {
      border-color: #ffc153;
    }
    &:hover fieldset {
      border-color: #ffc153;
    }
    &.Mui-focused fieldset {
      border-color: #ffc153;
    }
  }
`;

export default function Problemas() {
  const [inputValue, setInputValue] = React.useState(false);
  const [rightAnswer, setRightAnswer] = React.useState(false);
  const [wrongAnswer, setWrongAnswer] = React.useState(false);
  const [noAnswer, setNoAnswer] = React.useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const toggleResult = () => {
    if (inputValue == "5") {
      setRightAnswer(true);
      setWrongAnswer(false);
      setNoAnswer(false);
    } else if (inputValue == " ") {
      setNoAnswer(true);
      setRightAnswer(false);
      setWrongAnswer(false);
    } else {
      setRightAnswer(false);
      setWrongAnswer(true);
      setNoAnswer(false);
    }
  };

  const navigate = useNavigate();
  function navigateToPerfil() {
    navigate("/perfil");
  }

  return (
    <div className="prob-container">
      <div className="prob-header">
        <div className="icon-perfil" onClick={navigateToPerfil}>
          <Avatar alt="Remy Sharp" src={AvatarImg} />
          <p>Mariana Oliveira</p>
        </div>
      </div>
      <div className="prob-question">
        <h1>Nível X</h1>
        <h3>Pergunta X</h3>
        <p>
          lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem
          ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem
          ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem{" "}
        </p>
      </div>
      <div className="prob-input">
        <Input
          fullWidth
          id="outlined-basic"
          label="Resposta"
          variant="outlined"
          margin="normal"
          style={{ width: 500 }}
          onChange={handleInputChange}
        />
        <div className="question-button">
          <Button
            variant="contained"
            sx={[
              {
                borderRadius: "50px",
                width: 1 / 8,
                height: "40px",
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "700",
                backgroundColor: "#FFC153",
                letterSpacing: "5px",

                ":hover": {
                  backgroundColor: "#DAA548",
                },
              },
            ]}
            onClick={toggleResult}
          >
            Enviar
          </Button>
          {rightAnswer && (
            <div className="positive-feedback">
              <span>Resposta correta!</span>
            </div>
          )}
          {wrongAnswer && (
            <div className="negative-feedback">
              <span>Resposta errada! O valor correto é X</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
