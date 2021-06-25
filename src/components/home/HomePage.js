import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import MoneyLog from "./MoneyLog";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import scrollLoading from "../../assets/scrollLoading.gif";

export default function HomePage({ finance, getFinance, hasMore }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (finance !== null && finance.length !== 0) {
      let tempBalance = 0;
      finance.forEach((l) => {
        if (l.type === "in") {
          tempBalance += parseFloat(l.value / 100);
        } else {
          tempBalance -= parseFloat(l.value / 100);
        }
      });
      setBalance(tempBalance);
    }
  }, [finance]);

  return (
    <Container>
      <div className="scroll">
        <InfiniteScroll
          dataLength={finance?.length}
          next={getFinance}
          hasMore={hasMore}
          loader={
            <MoreLogs>
              <img src={scrollLoading} alt="scroll loading gif" />
            </MoreLogs>
          }
        >
          {finance !== null && finance.length === 0 ? (
            <p className="no-logs">Não há registros de entrada ou saída</p>
          ) : finance === null ? (
            ""
          ) : (
            finance.map((log) => {
              return <MoneyLog log={log} key={log.id} />;
            })
          )}
        </InfiniteScroll>
      </div>

      <Balance balance={balance}>
        <span className="balance">SALDO</span>
        <span className="balance-value">
          {balance.toFixed(2).replace(".", ",")}
        </span>
      </Balance>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .scroll {
    overflow: scroll;
    height: calc(100% - 28px);
  }
`;

const Balance = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  line-height: 20px;
  position: absolute;
  bottom: 0;
  left: 0;

  .balance {
    font-weight: bold;
    color: #000000;
  }
  .balance-value {
    color: ${(props) => (props.balance > 0 ? "#03AC00" : "#C70000")};
  }
`;

const MoreLogs = styled.div`
  height: 30px;
  width: 100%;

  img {
    height: 20px;
    width: 20px;
  }
`;
