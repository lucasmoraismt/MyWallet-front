import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
`;
const Introduction = styled.div`
  .page-title {
    font-family: Passion One;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    font-family: Saira Stencil One;
    font-size: 32px;
    line-height: 50px;
    margin-bottom: 25px;
  }
`;
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  max-width: 500px;
  input {
    width: 100%;
    height: 58px;
    background: #ffffff;
    border-radius: 5px;
    border: none;
    outline: none;
    margin-bottom: 13px;
    padding: 15px;
  }
  input:disabled {
    opacity: "0.7";
    pointer-events: "none";
  }
  input::placeholder {
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }
  button {
    width: 100%;
    height: 46px;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 13px;
    color: #ffffff;
  }
  button:disabled {
    opacity: "0.7";
    pointer-events: "none";
  }
`;
const StyledLink = styled.p`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;

  :disabled {
    opacity: "0.7";
    pointer-events: "none";
  }
`;

export { Container, Introduction, FormContainer, Form, StyledLink };
