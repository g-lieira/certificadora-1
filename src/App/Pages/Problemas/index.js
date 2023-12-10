import * as React from "react";
import { useEffect, useState, useContext }  from "react";
import { Button, TextField, styled, Avatar } from "@mui/material";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import figura1 from "../../Assets/figura1.jpg";
import figura2 from "../../Assets/figura2.png";
import figura3 from "../../Assets/figura3.png";

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
  const {userId} = useContext(AuthContext);
  const {currentQuestion} = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [userQuestions, setUserQuestions] = useState("");
  const [enunciado, setEnunciado] = useState("");
  const [numero, setNumero] = useState("");
  const [nivel, setNivel] = useState("");
  const [figura, setFigura] = useState("");
  const [altArray, setAltArray] = useState([]);
  const [resposta, setResposta] = useState("");
  const questionCollectionRef = collection(db, "index");
  const [questions, setQuestions] = useState([]);
  const [userLevels, setUserLevels] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [timesDone, setTimesDone] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(()=>{
    getDoc(doc(db, "users", userId)).then(docSnap => {
      setUserName(docSnap.data().nome);
      try{
        setUserQuestions(docSnap.data().questoes);
      }catch{
        setUserQuestions("0");
      }
      setUserLevels(docSnap.data().niveis);
      setTimesDone(docSnap.data().resolvido);
      setUserPoints(docSnap.data().total);
      setDone(docSnap.data().fez)
    });
    getDoc(doc(db, "index", currentQuestion)).then(docSnap => {
      setEnunciado(docSnap.data().enunciado);
      setNivel(docSnap.data().nivel);
      setNumero(docSnap.data().numero);
      setFigura(docSnap.data().figura);
      setResposta(docSnap.data().resposta);
      setAltArray(docSnap.data().alternativas.split('-'));
    })
    
  },[]);


  const [inputValue, setInputValue] = React.useState("");
  const [rightAnswer, setRightAnswer] = React.useState(false);
  const [wrongAnswer, setWrongAnswer] = React.useState(false);
  const [noAnswer, setNoAnswer] = React.useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function registerQuestion(){
    let userQ;
    if(userQuestions==undefined){
      userQ="0";
    }else{
      userQ=userQuestions;
    }
    let newString = userQ;
    let array = userQ;
    let isAlreadyIn = false;
    array.map(item=>{
      if(item == numero){
        isAlreadyIn = true;
      }
    });
    if(isAlreadyIn == false){
      array.push(numero);
      const userRef = doc(db, 'users', userId);
      setDoc(userRef, { questoes: array }, { merge: true });
    }
  }

  const toggleResult = () => {
    if(inputValue!=""){
      if (inputValue.toLowerCase() == resposta) {
        setRightAnswer(true);
        setWrongAnswer(false);
        setNoAnswer(false);
        registerQuestion();
        const array = userQuestions;
        let alreadyDone=false;
        alreadyDone = done[numero];
        if(alreadyDone){
          let points=0;
          if(Number(nivel)==1){
            points=100;
          }else if(Number(nivel)==2){
            points=250;
          }else if(Number(nivel)==3){
            points=500
          }
          let timeArray=timesDone;
          let userPts;
          if(Number(timeArray[numero])==0){
            userPts = points;
          }else{
            userPts = points/(2*timeArray[numero]);
          }
          userPts= userPts+Number(userPoints);
          timeArray[numero] = Number(timeArray[numero])+1;
          const userRef = doc(db, 'users', userId);
          setDoc(userRef, { resolvido: timeArray, total: userPts }, { merge: true });
        }else{
          let points=0;
          if(Number(nivel)==1){
            points=100;
          }else if(Number(nivel)==2){
            points=250;
          }else if(Number(nivel)==3){
            points=500
          }
          let timeArray=timesDone;
          let userPts;
          if(Number(timeArray[numero])==0){
            userPts = points;
          }else{
            userPts = points/(2*timeArray[numero]);
          }
          userPts= userPts+Number(userPoints);
          timeArray[numero] = Number(timeArray[numero])+1;
          let levelArray = userLevels;
          if(Number(levelArray[numero])>1){
            levelArray[numero] = Number(levelArray[numero])-1;
          }
          let arrayDone = done;
          arrayDone[numero] = true;
          const userRef = doc(db, 'users', userId);
          setDoc(userRef, { niveis: levelArray, resolvido: timeArray, total: userPts, fez: arrayDone }, { merge: true });
        }
        document.getElementById("outlined-basic").disabled = true;
        document.getElementById("outlined-basic").style.cursor="not-allowed";
        document.getElementById("sendButton").disabled = true;
        document.getElementById("sendButton").style.cursor="not-allowed";
        setTimeout(() => {
          navigate("/lista-problemas");
        }, "2000");
        
      }else {
        let array = userLevels;
          if(Number(array[numero])<3){
            array[numero] = Number(array[numero])+1;
          }
          let arrayDone = done;
          arrayDone[numero] = true;
          setUserLevels(array);
          const userRef = doc(db, 'users', userId);
          setDoc(userRef, { niveis: array, fez: arrayDone }, { merge: true });
        setRightAnswer(false);
        setWrongAnswer(true);
        setNoAnswer(false);
      }
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
          <p>{userName}</p>
        </div>
      </div>
      <div className="prob-question">
        <h1>Nível {userLevels[numero]}</h1>
        <h3>Pergunta {numero}</h3>
        <p>{enunciado}</p>
        {figura=="figura1" && <img src={figura1} alt="" />}
        {figura=="figura2" && <img src={figura2} alt="" />}
        {figura=="figura3" && <img src={figura3} alt="" />}
        <ul>
        {altArray.map(alt=>{
          return(<li>{alt}</li>);
        })}
        </ul>
      </div>
      <div className="prob-input">
        <Input
          fullWidth
          id="outlined-basic"
          label="Resposta"
          variant="outlined"
          margin="normal"
          style={{ width: 600 }}
          onChange={handleInputChange}
        />
        <div className="question-button">
          <Button
            variant="contained"
            id="sendButton"
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
              <span>Resposta errada! A alternativa correta é a {resposta+")"}!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
