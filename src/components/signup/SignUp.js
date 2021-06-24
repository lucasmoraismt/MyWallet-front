import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import {
  Container,
  Introduction,
  FormContainer,
  Form,
  StyledLink,
} from "../styles/AuthenticationStyle";

export default function SignUp() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.user) {
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
      history.push("/home");
    }
  });

  function newUser(event) {
    event.preventDefault();
    if (
      validateEmail(email) &&
      firstPassword.trim().length > 0 &&
      name.trim().length > 0 &&
      firstPassword === secondPassword
    ) {
      setLoading(true);
      const body = {
        name,
        email,
        firstPassword,
      };
      const request = axios.post("http://localhost:4000/sign-up", body);
      request.then((response) => {
        history.push("/");
      });

      request.catch((error) => {
        if (error.response.status === 403) {
          alert("Erro ao registrar. Email já existente.");
        } else {
          if (error.response.data.message) {
            alert(
              `${error.response.data.message}. Por favor, tente novamente.`
            );
          } else {
            alert("Erro ao registrar. Por favor, tente novamente.");
          }
        }
        setLoading(false);
      });
    } else {
      if (!validateEmail(email)) {
        alert("Adicione um e-mail válido.");
        return;
      }
      if (
        firstPassword.trim().length === 0 ||
        firstPassword !== secondPassword
      ) {
        alert("Senha inválida.");
        return;
      }
      if (name.trim().length === 0) {
        alert("Campo de nome vazio.");
      }
    }
  }
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function isURL(url) {
    const re =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    return re.test(String(url).toLowerCase());
  }

  return (
    <Container>
      <Introduction>
        <p className="page-title">MyWallet</p>
      </Introduction>
      <FormContainer>
        <Form onSubmit={newUser}>
          <input
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Nome"
            required
          ></input>
          <input
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="E-mail"
            required
          ></input>
          <input
            disabled={loading}
            onChange={(e) => setFirstPassword(e.target.value)}
            value={firstPassword}
            type="password"
            placeholder="Senha"
            required
          ></input>
          <input
            disabled={loading}
            onChange={(e) => setSecondPassword(e.target.value)}
            value={secondPassword}
            type="password"
            placeholder="Confirme a senha"
            required
          ></input>
          <button disabled={loading} type="submit">
            {loading ? <>Cadastrando...</> : <>Cadastrar</>}
          </button>
        </Form>
        <StyledLink to="/">
          <p>Já tem uma conta? Entre agora!</p>
        </StyledLink>
      </FormContainer>
    </Container>
  );
}
