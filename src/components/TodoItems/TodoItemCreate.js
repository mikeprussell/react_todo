import React, { useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function TodoItemCreate(props) {
  const actionRef = useRef();
  const doneRef = useRef();
  const catRef = useRef();

  const [valSummary, setValSummary] = useState("");
  const [actionVal, setActionVal] = useState("");
  const [doneVal, setDoneVal] = useState("");

  const validate = (todoitem) => {
    let action = todoitem.Action;

    action.length > 75
      ? setActionVal("** Max 75 Characters")
      : setActionVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoitem = {
      Action: actionRef.current.value,
      Done: doneRef.current.value,
      CategoryId: catRef.current.value,
    };

    validate(todoitem);

    if (actionVal === "") {
      props.addTodoItem(todoitem);
    } else {
      setValSummary("Correct the inputs below to create the todo item.");
    }
  };

  return (
    <article className="createTodoItem m-2 text-white align-items-center">
      <Card bg="dark">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h1 className="m-2">Create Todo Item</h1>
            <br />
            {valSummary !== "" && (
              <div className="alert alert-danger">
                <strong>{valSummary}</strong>
              </div>
            )}

            <Form.Group id="action" className="text-left">
              <label>Task</label>
              <Form.Control type="text" ref={actionRef} required />
              <div className="text-danger">{actionVal}</div>
            </Form.Group>

            <Form.Group id="cat" className="text-left">
              <label>
                Category (if Category not listed, please create it first)
              </label>
              <select className="form-control" ref={catRef} required>
              {props.categories.map((cat) => (
                  <option key={cat.CategoryId} value={cat.CategoryId}>
                    {cat.CategoryName}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group id="url" className="text-center">
              <label>Done</label>
              <Form.Control type="checkbox" ref={doneRef} />
              <div className="text-danger">{doneVal}</div>
            </Form.Group>

            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
            
          </Form>
        </Card.Body>
      </Card>
    </article>
  );
}
