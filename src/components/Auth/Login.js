import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Card, Jumbotron } from "react-bootstrap";
import { useHistory } from "react-router"; 

export default function Login() {
  const { authenticate } = useAuth();
  const history = useHistory();


  async function handleAuth() {
    await authenticate();
    history.push("/");
  }

  return (
    <section className="login pb-4">
      <Jumbotron className="text-center" style={{backgroundColor: "lightblue"}}>
        <h1 className="mb-3">Welcome to the Todo List App</h1>
      </Jumbotron>
      <Container >
        <Card className="border-dark text-center">
          <Card.Header className="bg-dark text-white">
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button onClick={() => handleAuth()} className="btn btn-dark">
              Login w/ GitHub
            </button>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}
