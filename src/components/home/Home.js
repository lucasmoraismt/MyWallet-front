import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

import Loading from "../helpers/Loading";
import HomePage from "./HomePage";
import { ExitOutline } from "react-ionicons";
import { AddCircleOutline } from "react-ionicons";
import { RemoveCircleOutline } from "react-ionicons";

export default function Home() {
  const [finance, setFinance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { user, setUser } = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    getFinance();
  }, []);

  useEffect(() => {
    if (localStorage.user && !user?.token) {
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
      history.push("/home");
    }
  }, []);

  function getFinance() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    let url = `http://localhost:4000/finance`;
    let referenceId;

    if (finance && finance.length > 0) {
      referenceId = finance[finance.length - 1].id;
      url = `${url}?olderThan=${referenceId}`;
    }

    const request = axios.get(url, config);
    let newLogs;

    request.then((response) => {
      if (finance) {
        newLogs = [...response.data, ...finance];
      } else {
        newLogs = [...response.data];
      }

      if (response.data.length < 10) {
        setHasMore(false);
      }

      setFinance(newLogs);
      setIsLoading(false);
    });

    request.catch((err) => {
      alert("Ocorreu um erro ao obter os dados do servidor");
    });
  }

  function signOut() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.delete("http://localhost:4000/sessions", config);

    request.then(() => {
      localStorage.clear();
      history.push("/");
      setUser(null);
    });
    request.catch((err) => {
      alert("Ocorreu um erro ao obter os dados do servidor");
    });
  }

  function changePage(direction) {
    if (direction === "in") {
      history.push("/income");
    } else if (direction === "out") {
      history.push("/expense");
    }
  }

  const firstName = user.name.split(" ")[0];

  return (
    <Container>
      <div className="header">
        <p className="greeting">{`Olá, ${firstName}`}</p>
        <ExitOutline
          onClick={signOut}
          color={"#FFFFFF"}
          height="26px"
          width="25px"
        />
      </div>
      <Finance>
        {isLoading ? (
          <Loading />
        ) : (
          <HomePage
            finance={finance}
            getFinance={getFinance}
            hasMore={hasMore}
          />
        )}
      </Finance>
      <Buttons>
        <button onClick={() => changePage("in")} className="in">
          <AddCircleOutline color={"#ffffff"} height="23px" width="23px" />
          <p>Nova entrada</p>
        </button>
        <button onClick={() => changePage("out")} className="out">
          <RemoveCircleOutline color={"#ffffff"} height="23px" width="23px" />
          <p>Nova saída</p>
        </button>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 25px 25px 16px;

  .header {
    display: flex;
    justify-content: space-between;
  }
  .greeting {
    max-width: calc(100% - 30px);
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
  }
`;

const Finance = styled.div`
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;

  button.in,
  button.out {
    width: calc(100vw / 2 - 32px);
    outline: none;
    border: none;
    border-radius: 5px;
    background: #a328d6;
    height: 114px;
    position: relative;
    padding: 10px;
    display: flex;
    align-items: flex-end;
  }
  svg {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  p {
    max-width: 70px;
    text-align: left;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }
`;
