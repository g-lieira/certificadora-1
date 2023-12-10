import * as React from 'react';
import { Button, TextField, styled, Avatar,  } from "@mui/material";
import { useEffect, useState, useContext }  from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

import "./styles.scss";
import loginImg from "../../Assets/login-img.svg";



export default function Perfil() {
    const {userId} = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [userPoints, setUserPoints] = useState(0);
    const [userQuestions, setUserQuestions] = useState([]);
    const [q1, setQ1] = useState("exercise not-resolved");
    const [q2, setQ2] = useState("exercise not-resolved");
    const [q3, setQ3] = useState("exercise not-resolved");
    const [q4, setQ4] = useState("exercise not-resolved");
    const [q5, setQ5] = useState("exercise not-resolved");
    const [q6, setQ6] = useState("exercise not-resolved");
    const [q7, setQ7] = useState("exercise not-resolved");
    const [q8, setQ8] = useState("exercise not-resolved");
    const [q9, setQ9] = useState("exercise not-resolved");
    const [q10, setQ10] = useState("exercise not-resolved");
    const navigate = useNavigate();

    useEffect(()=>{
        getDoc(doc(db, "users", userId)).then(docSnap => {
            setUserName(docSnap.data().nome);
            try{
              setUserQuestions(docSnap.data().questoes);
            }catch{
              setUserQuestions("0");
            }
            setUserPoints(docSnap.data().total);
        });
    },[]);
    useEffect(()=>{
        setupQuestions();
    });

    const resolved = true; //deve ser alterado para receber do bd (identificando o id também)

    //porcentagem deve ser alterado de acordo com a quantidade de ex feitos e não feitos
    const [percent1, setPercent1] = useState(50);
    const [percent2, setPercent2] = useState(50);
    const radius = 105; // Raio do círculo
    const circumference = 2 * Math.PI * radius; // Circunferência do círculo

  // calculo do comprimento da porção de círculo que deve ser destacada
    const dash1 = ((percent1 / 100) * circumference).toFixed(2);
    const dash2 = ((percent2 / 100) * circumference).toFixed(2);

    //coloração do progresso de exercícios 
    const progressClass = resolved ? 'exercise resolved' : 'exercise not-resolved';
    const progressClass2 = resolved ? 'exercise not-resolved' : 'exercise resolved';

    function setupQuestions(){
        userQuestions.map((number)=>{
            switch(Number(number)){
                case 1:
                    setQ1("exercise resolved");
                    break;
                case 2:
                    setQ2("exercise resolved");
                    break;
                case 3:
                    setQ3("exercise resolved");
                    break;
                case 4:
                    setQ4("exercise resolved");
                    break;
                case 5:
                    setQ5("exercise resolved");
                    break;
                case 6:
                    setQ6("exercise resolved");
                    break;
                case 7:
                    setQ7("exercise resolved");
                    break;
                case 8:
                    setQ8("exercise resolved");
                    break;
                case 9:
                    setQ9("exercise resolved");
                    break;
                case 10:
                    setQ10("exercise resolved");
                    break;
                default:
                    break;
            }
        });
        setPercent1((userQuestions.length-1)*10)
        setPercent2((100-(userQuestions.length-1)*10))
    }

    function resetProgress(){
        let t = 0;
        let r = ["X",0,0,0,0,0,0,0,0,0,0];
        let q = ["X"];
        let n = ["X",1,1,1,1,2,2,2,3,3,3];
        let f = ["X",false,false,false,false,false,false,false,false,false,false];
        const userRef = doc(db, 'users', userId);
        setDoc(userRef, { total: t, resolvido:r, questoes: q, niveis:n, fez:f }, { merge: true });
        navigate("/lista-problemas");
    }

    return (
        <div className='perfil-container'>
            <div className='perfil-infos'>
                <img
                    src={loginImg}
                    alt="ilustração de um fastama, utilizado como avatar"
                />
                <div>
                    <h1>Olá {userName}!</h1>
                    <p>Você possui: {userPoints} pontos</p>
                    <button onClick={resetProgress}>Reiniciar progresso</button>
                </div>
            </div>
            <div className='progress'>
                <div className='title'>
                    <h3>PROBLEMAS JÁ RESOLVIDOS</h3>
                </div>
                <div className='questions-asked'>
                    <div className='questions-check'>
                        <div>
                            <div>
                                <svg >
                                    <circle className={q1} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>1</div>
                            </div>
                            <div>
                                <svg>
                                    <circle className={q2} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>2</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q3} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>3</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q4} cx="30" cy="30" r="30"/>                
                                </svg>
                                <div>4</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q5} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>5</div>
                            </div>
                            
                        </div>
                        <div>
                            <div>
                                <svg >
                                    <circle className={q6} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>6</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q7} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>7</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q8} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>8</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q9} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>9</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={q10} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>10</div>
                            </div>
                        </div>
                    </div>
                    <div className="circle-percentage">
                        <svg viewBox="-1 -1 212 212">
                            <circle 
                            r={radius}
                            cx={radius}
                            cy={radius}
                            style={{
                                strokeDasharray: `${dash1} ${circumference}`,
                            }}
                            />
                            <circle 
                            r={radius}
                            cx={radius}
                            cy={radius}
                            style={{
                                strokeDasharray: `${dash2} ${circumference}`,
                                strokeDashoffset: `-${dash1}`,
                            }}
                            />
                        </svg>
                        <div className="percentage">{`${percent1}%`}</div> 
                    </div>
                </div>
            </div>
        </div>
    )
}