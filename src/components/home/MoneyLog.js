import styled from "styled-components";
import dayjs from "dayjs";

export default function MoneyLog({ log }) {
  const date = dayjs(log.date).format("DD/MM");
  return (
    <Container type={log.type}>
      <div className="date-text">
        <span className="date">{date}</span>
        <span className="text">{log.text}</span>
      </div>
      <span className="value">
        {(log.value / 100).toFixed(2).replace(".", ",")}
      </span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
  overflow-x: hidden;

  .date-text {
    font-size: 16px;
    line-height: 19px;
    display: flex;
  }
  .date {
    color: #c6c6c6;
    margin-right: 8px;
  }
  .text {
    color: #000000;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: wrap;
    overflow: hidden;
  }
  .value {
    color: ${(props) => (props.type === "in" ? "#03AC00" : "#C70000")};
  }
`;
