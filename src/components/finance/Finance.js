import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Finance({ type }) {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.user && !user?.token) {
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
      history.push("/home");
    }
  }, []);

  async function submitInputs(e, type) {
    e.preventDefault();
    setLoading(true);
    const newValue = (value * 100).toFixed(0);
    const body = {
      userId: user.id,
      type,
      text: description,
      value: newValue,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    let url = "http://localhost:4000/";

    if (type === "in") {
      url += "income";
    } else if (type === "out") {
      url += "expense";
    }

    try {
      const request = await axios.post(url, body, config);

      history.push("/home");
    } catch {
      alert("Erro desconhecido.");
    }
  }

  return (
    <Container>
      <p className="page-title">Nova {type === "in" ? "entrada" : "saída"}</p>
      <Form onSubmit={(e) => submitInputs(e, type)}>
        <input
          disabled={loading}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="number"
          placeholder="Valor"
          required
        ></input>
        <input
          disabled={loading}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Descrição"
          required
        ></input>
        <button disabled={loading} type="submit">
          {loading ? (
            <>Salvando...</>
          ) : (
            <>Salvar {type === "in" ? "entrada" : "saída"}</>
          )}
        </button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 25px;

  .page-title {
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
  }
`;

const Form = styled.form`
  margin-top: 40px;
  width: 100%;

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
