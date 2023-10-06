import * as React from 'react';
import { useNavigate } from "react-router";
import { useEffect, useState }  from "react";
import { db } from "../../Firebase/firebase-config";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import userImg from "../../Assets/login-img.svg"

import AvatarImg from "../../Assets/login-img.svg";
import "./styles.scss";

export default function ListaProblemas() {

  // importando informações do backend

  const questionCollectionRef1 = collection(db, "nivel1");
  const [questions1, setQuestions1] = useState([]);
  const questionCollectionRef2 = collection(db, "nivel2");
  const [questions2, setQuestions2] = useState([]);
  const questionCollectionRef3 = collection(db, "nivel3");
  const [questions3, setQuestions3] = useState([]);

  useEffect(()=>{
    const getQuestions1= async () => {
      const data = await getDocs(questionCollectionRef1);
      setQuestions1(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuestions1();
    const getQuestions2= async () => {
      const data = await getDocs(questionCollectionRef2);
      setQuestions2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuestions2();
    const getQuestions3= async () => {
      const data = await getDocs(questionCollectionRef3);
      setQuestions3(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuestions3();
  },[]);

  // importando informações do backend

  const navigate = useNavigate();
    function navigateToPerfil(){
        navigate("/perfil");
      }

  return(
  <>
    <div className='dashboardPageContainer'>
      <header>
        <h1>Hora de Praticar!</h1>
        <div onClick={navigateToPerfil}>
          <img src={userImg} alt="user image" />
          <h2>Marina Oliveira</h2>
        </div>
      </header>
      <div className='dashboard'>
        <div className='dashboardHeader'>
          <h3>Exercício</h3>
          <h3>Nível</h3>
        </div>
        <div className='dashboardList'>
          {questions1.map(question=>{
            return(
              <div className='dashboardItem'>
                <h4>{question.enunciado}</h4>
                <h4>1</h4>
              </div>
            )
          })}
          {questions2.map(question=>{
            return(
              <div className='dashboardItem'>
                <h4>{question.enunciado}</h4>
                <h4>2</h4>
              </div>
            )
          })}
          {questions3.map(question=>{
            return(
              <div className='dashboardItem'>
                <h4>{question.enunciado}</h4>
                <h4>3</h4>
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  </>                  
  );
}
