import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "../store/User/actionCreators";
import Button from "./shared/Button";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    history.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "40px",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 8,
        backgroundColor: "#350d36",
        color:"#BCABBC"
      }}
    >
      {userName && (
        <div>
          Logged in as {userName}
          <Button
            type="button"
            onClick={() => handleLogout()}
            text={"Logout"}
          ></Button>
        </div>
      )}
    </div>
  );
}
