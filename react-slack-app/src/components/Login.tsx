import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "../store/User/actionCreators";
import Button from "./shared/Button";
import TextField from "./shared/TextField";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setUser({ userName: userName, id: Math.floor(Math.random() * 10000) })
    );
    history.push("/slack");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,.1)",
          background: "white",
          padding: 16,
        }}
      >
        <h2>Select a user name</h2>
        <TextField
          id="userNameInput"
          name="Username"
          onChange={(value: string) => setUserName(value)}
          value={userName}
        ></TextField>
        <Button type="submit" text="Go" disabled={userName === ""}></Button>
      </div>
    </form>
  );
}
