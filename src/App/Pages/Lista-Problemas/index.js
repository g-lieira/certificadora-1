import * as React from 'react';
import {
  styled,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  tableCellClasses,
  Modal,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState, useContext }  from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import AvatarImg from "../../Assets/login-img.svg";
import "./styles.scss";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#B05F6D',
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Lato',
    fontWeight: '500',
    height: '50px',
    cursor: 'auto',

    '&:nth-child(1)': {
      padding: '0 50px',
    },

    '&:nth-child(2)': {
      textAlign: 'center',
    },
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontFamily: 'Lato',
    padding: '20px 100px 20px 50px',
  },
}));

const StyledTableCellLevel = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontFamily: 'Lato',
    padding: '20px 80px',
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#B4CBED',
  },


  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const useStyles = styled(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
  border: 'none',
  boxShadow: 25,
  fontFamily: 'Lato',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

function createData(exercicios, nivel) {
  return { exercicios, nivel };
}

var rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: "exercicios",
    numeric: false,
    disablePadding: true,
    label: "Exercícios"
  },
  { 
    id: "nivel", 
    numeric: true, 
    disablePadding: false, 
    label: "Nível" 
  },
];

function EnhancedTableHead(props) {
  const {
    classes,

    order,
    orderBy,

    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'exercicios' ? (
              <div>{headCell.label}</div>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            )}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

export default function ListaProblemas() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("exercicios");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const {userId} = useContext(AuthContext);
  const [userQuestions, setUserQuestions] = useState("");
  const {setCurrentQuestion} = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [userlevels, setUserLevels] = useState([]);

  // importando informações do backend

  const questionCollectionRef = collection(db, "index");
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    getDoc(doc(db, "users", userId)).then(docSnap => {
      setUserName(docSnap.data().nome);
      try{
        setUserQuestions(docSnap.data().questoes);
      }catch{
        setUserQuestions("0");
      }
      setUserLevels(docSnap.data().niveis)
    })

    const getQuestions= async () => {
      const data = await getDocs(questionCollectionRef);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuestions();
  },[]);
  useEffect(()=>{
    rows=[];
    questions.map(question=>{
      rows.unshift(createData(question.numero+" – "+question.enunciado, userlevels[question.numero]));
      return null;
    });
    var jsonObject = rows.map(JSON.stringify);
    var uniqueSet = new Set(jsonObject);
    var uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    rows = uniqueArray;
  });

  questions.map(question=>{
    rows.unshift(createData(question.numero+" – "+question.enunciado, userlevels[question.numero]));
    return null;
  });

  var jsonObject = rows.map(JSON.stringify);
  var uniqueSet = new Set(jsonObject);
  var uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  rows = uniqueArray;

  // importando informações do backend

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  const navigate = useNavigate();
    function navigateToPerfil(){
        navigate("/perfil");
    }


  function modalRedirect(){
    navigate("/problema");
  }

  function redirectToProblem(statement){
    let questionId;
    let questionNumber;
    let isAlreadyDone=false;
    let isValid=false;
    statement = statement.split("– ")[1];
    let array = userQuestions;
    questions.map(question =>{
      if(question.enunciado==statement){
        questionId = question.id;
        questionNumber = Number(question.numero);
      }
    })
    setCurrentQuestion(questionId);
    array.map(item=>{
      if(Number(item)==questionNumber){
        isAlreadyDone=true;
      }
    });
    if(questionNumber>=0 && questionNumber<=4){
      isValid=true;
    }else if(questionNumber>=5 && questionNumber<=7){
      let counter=0;
      array.map(item=>{
        if(Number(item)>0 && Number(item)<=4){
          counter++;
        }
      });
      if(counter >=1){
        isValid=true;
      }
    }else if(questionNumber>=8 && questionNumber<=10){
      let counter=0;
      array.map(item=>{
        if(Number(item)>=5 && Number(item)<=7){
          counter++;
        }
      });
      if(counter >=1){
        isValid=true;
      }
    }
    if(isAlreadyDone==true){
      handleOpen();
    }
    if(isValid==false){
      handleOpen2();
    }
    if(isAlreadyDone==false && isValid==true){
      navigate("/problema");
    }
  }

  return (
    <div className="lista-container">
      <div className="lista-header">
        <h2>Hora de praticar!</h2>
        <div className="icon-perfil" onClick={navigateToPerfil}>
          <Avatar alt="Remy Sharp" src={AvatarImg}/>
          <p>{userName}</p>
        </div>
      </div>

      <div className="table-container">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <TableContainer
              sx={{ 
                maxHeight: 460,

                "&::-webkit-scrollbar": {
                  width: 8
                  },
                  "&::-webkit-scrollbar-track": {
                  backgroundColor: "#B05F5F",
                  },
                  "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#EFDFE2",
                  borderRadius: 50
                  }
              }}
            >
              <Table
                stickyHeader 
                className={classes.table}
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <StyledTableRow 
                          hover 
                          key={index} 
                        >
                          <StyledTableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            onClick={(e)=>{redirectToProblem(e.target.innerHTML)}}
                          >
                            {row.exercicios}
                          </StyledTableCell>
                          <StyledTableCellLevel align="right">{row.nivel}</StyledTableCellLevel>
                        </StyledTableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>

      <div className="modalExercicioResolvido">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box 
            sx={{ 
              ...style,
            }}
            className='bigModal'
          >
            <h2 id="parent-modal-title">VOCÊ JÁ RESOLVEU!</h2>
            <p id="parent-modal-description">
              O exercício escolhido já foi resolvido anteriormente, você quer refazer?
            </p>

            <div className="modalButtons">
              <Button className='naoButton' onClick={handleClose}>NÃO...</Button>
              <Button className='simButton' onClick={modalRedirect}>SIM!</Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div className="modalPularNivel">
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box 
            sx={{ 
              ...style,
            }}
            className='bigModal'
          >
            <h2 id="parent-modal-title">VOCÊ ESTÁ PULANDO DE NÍVEL!</h2>
            <p id="parent-modal-description">
              <b>Lembre-se:</b>Você só pode fazer um exercício depois que 
              passar pelos níveis anteriores, por exemplo: para fazer um 
              exercício nível 3 é preciso fazer um exercício nível 1 e 
              outro de nível 2 antes!
            </p>
          </Box>
        </Modal>
      </div>
      
    </div>
  );
}
