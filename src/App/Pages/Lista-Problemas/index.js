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
  tableClasses,
  tableRowClasses,
} from "@mui/material";

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
    padding: '20px 50px',
  },
}));

const StyledTableCellLevel = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontFamily: 'Lato',
    padding: '20px 50px',
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

function createData(exercicios, nivel) {
  return { exercicios, nivel };
}

const rows = [
  createData("A Enunciado do exercício aqui até onde caber", 1),
  createData("B Enunciado do exercício aqui até onde caber", 18),
  createData("C  Enunciado do exercício aqui até onde caber", 15),
  createData("H Enunciado do exercício aqui até onde caber", 23),
  createData("E Enunciado do exercício aqui até onde caber", 26),
  createData("X Enunciado do exercício aqui até onde caber", 29),
  createData("P Enunciado do exercício aqui até onde caber", 28),
  createData("M Enunciado do exercício aqui até onde caber", 36),
  createData("T Enunciado do exercício aqui até onde caber", 34),
  createData("S Enunciado do exercício aqui até onde caber", 33),
];

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
  { id: "nivel", numeric: true, disablePadding: false, label: "Nível" },
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
        {headCells.map(headCell => (
          <StyledTableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

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
}));

export default function ListaProblemas() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("niveis");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className="lista-container">
      <div className="lista-header">
        <h2>Hora de praticar!</h2>
        <div className="icon-perfil">
          <Avatar alt="Remy Sharp" src={AvatarImg} />
          <p>Mariana Oliveira</p>
        </div>
      </div>

      <div className="table-container">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <TableContainer>
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
                        <StyledTableRow hover>
                          <StyledTableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
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
    </div>
  );
}