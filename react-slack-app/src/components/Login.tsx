import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "../store/User/actionCreators";
import Button from "./shared/Button";
import TextField from "./shared/TextField";
import styled from "styled-components";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setUser({ userName: userName, id: Math.floor(Math.random() * 10000) })
    );
    history.push("/channels");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledContainer>
        <h2>Select a user name</h2>
        <TextField
          id="userNameInput"
          name="Username"
          onChange={(value: string) => setUserName(value)}
          value={userName}
        />
        <Button type="submit" text="Go" disabled={userName === ""}></Button>
      </StyledContainer>
    </StyledForm>
  );
}
const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;
