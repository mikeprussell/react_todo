import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function TodoItemEdit(props) {
  const [action, setAction] = useState(props.todoitem.Action);
  const [done, setDone] = useState(props.todoitem.Done);
  const [categoryId, setCategoryId] = useState(props.todoitem.CategoryId);

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
        TodoId: props.todoitem.TodoId,
        Action: action,
        Done: done,
        CategoryId: categoryId,
    };

    validate(todoitem);

    axios
      .put(`http://localhost:62432/api/todo/${todoitem.TodoId}`, todoitem)
      .then(() => {
        props.setEffectTrigger(!props.effectTrigger);
        props.setShowEdit(false);
      });
  };

  return (
    <Modal
      show={props.showEdit}
      onHide={() => props.setShowEdit(false)}
      size="lg"
    >
      <Modal.Header closeButton>
        <h1 className="text-center w-100">Edit {action}</h1>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {valSummary !== "" && (
            <div className="alert alert-danger">
              <strong>{valSummary}</strong>
            </div>
          )}
          
          <Form.Group id="action" className="text-left">
            <label>Task</label>
            <Form.Control
              type="text"
              defaultValue={action}
              onChange={(e) => setAction(e.target.value)}
              required
            />
            <div className="text-danger">{actionVal}</div>
          </Form.Group>

          <Form.Group id="cat" className="text-left">
            <label>Category</label>
            <select
              className="form-control"
              defaultValue={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {props.categories.map((cat) => (
                <option key={cat.CategoryId} value={cat.CategoryId}>
                  {cat.CategoryName}
                </option>
              ))}
              </select>
          </Form.Group>

          <Form.Group id="done" className="text-center">
            <label>Done</label>
            <Form.Control
              type="checkbox"
              defaultValue={done}
              onChange={(e) => setDone(e.target.value)}
            />
          </Form.Group>

          <Form.Group id="button" className="text-center">
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Form.Group>
          </Form>
      </Modal.Body>
    </Modal>
  );
}
