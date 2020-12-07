import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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
    <Container>
      {userName && (
        <>
          Logged in as {userName}
          <Button
            type="button"
            onClick={() => handleLogout()}
            text={"Logout"}
          ></Button>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  background-color: #350d36;
  color: #bcabbc;
`;
