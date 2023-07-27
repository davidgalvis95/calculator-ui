import Sidebar from "../sidebar/Sidebar";
import PersonIcon from "./PersonIcon";
import { Button } from "@mui/material";
import "./Profile.css";
import useOperationsApi from "../../hooks/useOperationsApi";
import { useState } from "react";

const Profile = (props) => {

  const [balance, setBalance] = useState(props.userBalance);
  const operationsApi = useOperationsApi();

  const getMoreBalance = () => {
    if(balance > 10) {
      alert("You still have enough balance to play with, please add when your balance is less than $10")
    }else {
      operationsApi
      .addUserBalance()
      .then((answer) => setBalance(answer));
    }
  }

  return (
    <div>
      <div className="profileContainer">
        <PersonIcon className="personIcon" />
        <div className="profileText">Email: {props.userEmail}</div>
        <div className="profileText">
          Roles:{" "}
          {props.userRoles.map((role, index) =>
            role
              .substring(5)
              .concat(index < props.userRoles.length - 1 ? ", " : "")
          )}
        </div>
        <div className="profileText">Current Balance: $ {balance}</div>
        <Button
              sx={{
                backgroundColor: "#f19066",
                color: "black",
                marginTop: "20px",
                marginLeft: "15px",
                "&:hover": {
                  backgroundColor: "#e77f67",
                },
                "@media screen and (max-width: 900px)": {
                  display: "flex",
                  marginTop: "20px",
                  marginLeft: "0px",
                  fontSize: "8px",
                },
              }}
              onClick={getMoreBalance}
            >
              Buy More Balance
            </Button>
      </div>
      <Sidebar open={false} />
    </div>
  );
};

export default Profile;
