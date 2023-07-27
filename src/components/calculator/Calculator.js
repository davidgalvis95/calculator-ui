import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import "./Calculator.css";
import Sidebar from "../sidebar/Sidebar";
import useOperationsApi from "../../hooks/useOperationsApi";
import {
  numberButtonStyle,
  operatorButtonStyle,
  textFieldStyle,
} from "./CalculatorMuiStyles";
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
const operations = {
  "+": "ADDITION",
  "-": "SUBTRACTION",
  "*": "MULTIPLICATION",
  "/": "DIVISION",
  "√": "SQUARE_ROOT",
  RAST: "RANDOM_STRING",
  "=": undefined,
  DEL: undefined,
};

const Calculator = () => {
  const [answer, setAnswer] = useState(undefined);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [shownText, setShownText] = useState("");
  const [operator, setOperator] = useState(undefined);
  const [operatorHasBeenClicked, setOperatorHasBeenClicked] = useState(false);
  const [specialOpHasBeenClicked, setSpecialOpHasBeenClicked] = useState(false);
  const [numberHasBeenClicked, setNumberHasBeenClicked] = useState(false);
  const [isNumberAnswer, setIsNumberAnswer] = useState(false);
  const [blockNum, setBlockNum] = useState(false);
  const [blockOp, setBlockOp] = useState(true);
  const operationsApi = useOperationsApi();

  useEffect(() => {
    if (answer) {
      if (!isNaN(answer)) {
        setA(answer.toString());
        setOperatorHasBeenClicked(false);
        setSpecialOpHasBeenClicked(false);
        setNumberHasBeenClicked(true);
        setBlockNum(true);
        setBlockOp(false);
        setIsNumberAnswer(true);
      } else {
        setA("");
        setNumberHasBeenClicked(false);
        setBlockNum(true);
        setBlockOp(true);
        setIsNumberAnswer(false);
      }
      setB("");
      setOperator(undefined);
      setShownText(answer.toString());
    }
  }, [answer]);

  const handleNumberClick = (event) => {
    const value = event.target.textContent;
    if (!isNaN(value) || value === ".") {
      if (!operatorHasBeenClicked) {
        setA((prev) => {
          if (shownText[shownText.length - 1] === "-") {
            return value === "."
              ? prev.concat(`-${addDotToNumber(prev)}`)
              : prev.concat(`-${value}`);
          } else {
            return value === "."
              ? prev.concat(addDotToNumber(prev))
              : prev.concat(value);
          }
        });
        if (operator !== "RAST" && operator !== "√") {
          setBlockOp(false);
        }
        setNumberHasBeenClicked(true);
      } else {
        setB((prev) => {
          if (
            isNaN(shownText[shownText.length - 2]) &&
            shownText[shownText.length - 1] === "-"
          ) {
            return value === "."
              ? prev.concat(`-${addDotToNumber(prev)}`)
              : prev.concat(`-${value}`);
          } else {
            return value === "."
              ? prev.concat(addDotToNumber(prev))
              : prev.concat(value);
          }
        });
      }
      setShownText((prev) =>
        value === "."
          ? prev.concat(addDotToNumber(prev, true))
          : prev.concat(value)
      );
    }
  };

  const addDotToNumber = (prev, toShownText) => {
    if (toShownText) {
      if (
        prev.split("").filter((char) => char === ".").length < 2 &&
        operator !== "RAST" &&
        operator !== "√"
      ) {
        return isNaN(prev[prev.length - 1]) || !prev ? "0." : ".";
      } else if (
        prev.split("").filter((char) => char === ".").length < 1 &&
        operator !== "RAST"
      ) {
        return isNaN(prev[prev.length - 1]) || !prev ? "0." : ".";
      } else {
        return "";
      }
    } else {
      if (!toShownText && !prev.includes(".") && operator !== "RAST") {
        return isNaN(prev[prev.length - 1]) || !prev ? "0." : ".";
      } else {
        return "";
      }
    }
  };

  const handleOperatorClick = (op) => {
    if (op === "=") {
      if (!answer) {
        setBlockNum(false);
      }
      sendOperationRequest();
    } else if (op === "DEL") {
      setBlockNum(false);
      setOperatorHasBeenClicked(false);
      setSpecialOpHasBeenClicked(false);
      setNumberHasBeenClicked(false);
      setA("");
      setB("");
      setShownText("");
      setAnswer(undefined);
      setOperator(undefined);
      setBlockOp(true);
    } else {
      if (a !== "") {
        if (op === "-") {
          if (operator === "-") {
            return;
          }
          setBlockNum(false);
          setBlockOp(true);
          setOperator((prev) => {
            if (prev === "*" || prev === "/" || prev === "+" || prev === "√") {
              return prev;
            } else {
              return op;
            }
          });
          setShownText((prev) => prev.concat(op));
        } else if (op === "RAST" || op === "√") {
          setBlockNum(true);
          setBlockOp(true);
          setAnswer(undefined);
          setOperator(op);
          setShownText((prev) => prev.concat(op));
        } else {
          setBlockNum(false);
          setBlockOp(true);
          setOperator(op);
          setShownText((prev) => prev.concat(op));
        }
        setOperatorHasBeenClicked(true);
        setAnswer(undefined);
      } else {
        if (op === "-") {
          setShownText((prev) => {
            return prev.concat(op);
          });
        } else if (op === "√" || op === "RAST") {
          setOperator(op);
          setShownText((prev) => (prev === "-" ? op : prev.concat(op)));
          setSpecialOpHasBeenClicked(true);
        }
      }
    }
  };

  const sendOperationRequest = () => {
    if (a !== "" && operator !== "") {
      let operationRequest = {
        operands: undefined,
        operationType: undefined,
      };
      if (operator === "RAST") {
        operationRequest = {
          ...operationRequest,
          operands: {
            size: parseInt(a, 10),
          },
          operationType: operations[operator],
        };
      } else if (operator === "√") {
        operationRequest = {
          ...operationRequest,
          operands: {
            a: parseFloat(a, 10),
          },
          operationType: operations[operator],
        };
      } else {
        if (b !== "") {
          operationRequest = {
            ...operationRequest,
            operands: {
              a: parseFloat(a, 10),
              b: parseFloat(b, 10),
            },
            operationType: operations[operator],
          };
        }
      }
      operationsApi
        .calculateOperation(operationRequest)
        .then((answer) => setAnswer(answer));
    }
  };

  const disableEqualsOperator = () => {
    if ((operator === "RAST" || operator === "√") && a !== "") {
      return false;
    } else if (a !== "" && operator && b !== "") {
      return false;
    } else {
      return true;
    }
  };

  const disableNotDelNorEqualsOps = (op) => {
    if (specialOpHasBeenClicked) {
      if (op === "√" || op === "RAST") {
        //since the calculator calculates these operators for 1 number, then no more than once of these is allowed
        return true;
      }
      if (op === "-") {
        if (operator === "√") {
          if (a !== "") {
            return true;
          }
          return false;
        }
        return true;
      }
    }
    if (!numberHasBeenClicked) {
      if (op === "-") {
        if (operator === "RAST") {
          //cannot generate random string of negative length
          return true;
        }
        return false;
      } else if (op === "√" || op === "RAST") {
        return false;
      } else {
        return blockOp;
      }
    } else {
      if (op === "-") {
        if (b !== "") {
          return true;
        }
        return false;
      } else if (op === "√" || op === "RAST") {
        return true;
      } else {
        return blockOp;
      }
    }
  };

  const disableOperator = (op) => {
    if (answer && !isNumberAnswer && op !== "DEL") {
      //disabled all except DEL when no number answers to continue operating
      return true;
    }
    if (op === "DEL") {
      return false;
    } else if (op === "=") {
      return disableEqualsOperator();
    } else {
      return disableNotDelNorEqualsOps(op);
    }
  };

  return (
    <Grid
      className="container"
      container
      sx={{
        margin: "0px",
      }}
    >
      <div className="innerContainerTitle">
        <Grid item xs={12} textAlign="center">
          <h2 className="title">Calculator</h2>
        </Grid>
      </div>
      <div className="displayContainer">
        <Grid item xs={12} className="inputs-and-dropdown-container">
          <TextField
            id="shownTextInput"
            className="operandInput"
            value={shownText}
            disabled={true}
            inputProps={{
              style: textFieldStyle,
            }}
          />
        </Grid>
      </div>
      <div className="innerContainer">
        <Grid item xs={12} className="inputs-and-dropdown-container">
          <Grid
            container
            // className="calculator"
            spacing={1}
            xs={8}
            justifyContent="center"
          >
            {numbersArray.map((num) => (
              <Grid key={num} item xs={4} className="buttonsNumberContainer">
                <Button
                  // className="button"
                  inputProps={{
                    width: "100px",
                  }}
                  sx={numberButtonStyle}
                  variant="contained"
                  // fullWidth
                  color="primary"
                  disabled={blockNum}
                  onClick={(e) => handleNumberClick(e, num)}
                >
                  {num}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            className="calculator"
            spacing={1}
            xs={8}
            justifyContent="center"
          >
            {Object.keys(operations).map((op) => (
              <Grid
                key={op}
                item
                xs={6}
                className="inputs-and-dropdown-container"
              >
                <Button
                  sx={operatorButtonStyle(op)}
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={disableOperator(op)}
                  onClick={() => handleOperatorClick(op)}
                >
                  {op}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
      <Sidebar open={false} />
    </Grid>
  );
};

export default Calculator;
