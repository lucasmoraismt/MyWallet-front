import styled from "styled-components";
import loading from "../../assets/loading.gif";

export default function Loading() {
  return (
    <Container>
      <img src={loading} alt="loading gif" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 24px);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 60px;
    width: 60px;
  }
`;
