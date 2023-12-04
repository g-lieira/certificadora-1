import * as React from 'react';
import { Button, TextField, styled, Avatar,  } from "@mui/material";
import { useEffect, useState, useContext }  from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import "./styles.scss";
import loginImg from "../../Assets/login-img.svg";



export default function Perfil() {
    const {userId} = useContext(AuthContext);
    const [userName, setUserName] = useState("");

    useEffect(()=>{
        getDoc(doc(db, "users", userId)).then(docSnap => {
          setUserName(docSnap.data().nome);
        })
    },[]);

    const resolved = true; //deve ser alterado para receber do bd (identificando o id também)

    //porcentagem deve ser alterado de acordo com a quantidade de ex feitos e não feitos
    const percent1 = 50;
    const percent2 = 50;
    const radius = 105; // Raio do círculo
    const circumference = 2 * Math.PI * radius; // Circunferência do círculo

  // calculo do comprimento da porção de círculo que deve ser destacada
    const dash1 = ((percent1 / 100) * circumference).toFixed(2);
    const dash2 = ((percent2 / 100) * circumference).toFixed(2);

    //coloração do progresso de exercícios 
    const progressClass = resolved ? 'exercise resolved' : 'exercise not-resolved';
    const progressClass2 = resolved ? 'exercise not-resolved' : 'exercise resolved';

    return (
        <div className='perfil-container'>
            <div className='perfil-infos'>
                <img
                    src={loginImg}
                    alt="ilustração de um fastama, utilizado como avatar"
                />
                <div>
                    <h1>Olá {userName}!</h1>
                    <p>Você possui: XX pontos</p>
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
                                    <circle className={progressClass} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>1</div>
                            </div>
                            <div>
                                <svg>
                                    <circle className={progressClass} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>2</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>3</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass} cx="30" cy="30" r="30"/>                
                                </svg>
                                <div>4</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>5</div>
                            </div>
                            
                        </div>
                        <div>
                            <div>
                                <svg >
                                    <circle className={progressClass2} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>6</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass2} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>7</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass2} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>8</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass2} cx="30" cy="30" r="30"/>
                                </svg>
                                <div>9</div>
                            </div>
                            <div>
                                <svg >
                                    <circle className={progressClass2} cx="30" cy="30" r="30"/>
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