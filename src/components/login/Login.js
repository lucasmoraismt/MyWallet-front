import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import UserContext from "../../contexts/UserContext";
import {
  Container,
  Introduction,
  FormContainer,
  Form,
  StyledLink,
} from "../styles/AuthenticationStyle";

export default function Login() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.user) {
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
      history.push("/home");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function userLogin(event) {
    event.preventDefault();
    if (email.trim().length > 0 && password.trim().length > 0) {
      setLoading(true);

      const body = {
        email,
        password,
      };

      const request = axios.post("http://localhost:4000/sign-in", body);
      request.then((response) => {
        setUser({
          id: response.data.user.id,
          name: response.data.user.name,
          token: response.data.token,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.user.id,
            name: response.data.user.name,
            token: response.data.token,
          })
        );

        history.push("/home");
      });
      request.catch((error) => {
        if (error.response.data.message) {
          alert(`${error.response.data.message}. Por favor, tente novamente.`);
        } else {
          alert("Erro ao fazer login. Por favor, tente novamente.");
        }
        setLoading(false);
      });
    } else {
      alert("Preencha todos os campos.");
    }
  }

  function checkLoading() {
    if (loading) {
      return;
    } else {
      history.push("/sign-up");
    }
  }

  return (
    <Container>
      <Introduction>
        <p className="page-title">MyWallet</p>
      </Introduction>
      <FormContainer>
        <Form onSubmit={userLogin}>
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Senha"
            required
          ></input>
          <button disabled={loading} type="submit">
            {loading ? <>Entrando...</> : <>Entrar</>}
          </button>
        </Form>
        <StyledLink onClick={checkLoading}>
          Primeira vez? Cadastre-se!
        </StyledLink>
      </FormContainer>
    </Container>
  );
}
