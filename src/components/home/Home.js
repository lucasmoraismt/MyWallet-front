import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

import Loading from "../helpers/Loading";
import HomePage from "./HomePage";
import { ExitOutline } from "react-ionicons";

export default function Home() {
  const [finance, setFinance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getFinance();
    }
  }, [user]);

  function getFinance() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    let url = `http://localhost:4000/home`;
    let referenceId;

    if (finance && finance.length > 0) {
      referenceId = finance[finance.length - 1].id;
      url = `${url}?olderThan=${referenceId}`;
    }

    const request = axios.get(url, config);
    let newLogs;

    request.then((response) => {
      if (finance) {
        newLogs = [...response.data.finance, ...finance];
      } else {
        newLogs = [...response.data.finance];
      }

      if (response.data.finance.length < 10) {
        setHasMore(false);
      }

      setFinance(newLogs);
      setIsLoading(false);
    });
  }

  const firstName = user.name.split(" ")[0];

  return (
    <Container>
      <div className="header">
        <p className="greeting">{`Olá, ${firstName}`}</p>
        <ExitOutline color={"#FFFFFF"} height="24px" width="23px" />
      </div>
      {isLoading ? <Loading /> : <HomePage />}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 25px 25px 16px;
`;
