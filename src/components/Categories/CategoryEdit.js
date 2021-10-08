import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function CategoryEdit(props) {
  const [categoryName, setCategoryName] = useState(props.category.CategoryName);
  const [categoryDescription, setCategoryDescription] = useState(
    props.category.CategoryDescription
  );

  const [valSummary, setValSummary] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [descVal, setDescVal] = useState("");

  const validate = (category) => {
    let name = category.CategoryName;
    let desc = category.CategoryDescription;

    name.length > 25 ? setNameVal("** Max 25 Characters") : setNameVal("");
    desc.length > 50 ? setNameVal("** Max 50 Characters") : setDescVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = {
      CategoryId: props.category.CategoryId,
      CategoryName: categoryName,
      CategoryDescription: categoryDescription,
    };

    validate(category);

    if (nameVal === "" && descVal === "") {
      axios
        .put(
          `http://localhost:62432/api/Categories/'${props.category.CategoryId}`,
          category
        )
        .then(() => {
          props.setEffectTrigger(!props.effectTrigger);
          props.setShowEdit(false);
        });
    } else {
      setValSummary("Please correct the errors below.");
    }
  };

  return (
    <Modal
      show={props.showEdit}
      onHide={() => props.setShowEdit(false)}
      size="lg"
    >
      <Modal.Header closeButton>
        <h1>Editing {props.category.CategoryName}</h1>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {valSummary !== "" && (
            <div className="alert alert-danger">
              <strong>{valSummary}</strong>
            </div>
          )}
          <Form.Group id="name" className="text-left">
            <label>Name</label>
            <Form.Control
              type="text"
              onChange={(e) => setCategoryName(e.target.value)}
              defaultValue={categoryName}
              required
            />
            <div className="text-danger">{nameVal}</div>
          </Form.Group>
          <Form.Group id="description" className="text-left">
            <label>Description</label>
            <Form.Control
              type="text"
              onChange={(e) => setCategoryDescription(e.target.value)}
              defaultValue={categoryDescription}
            />
            <div className="text-danger">{descVal}</div>
          </Form.Group>
          <Form.Group id="button" className="text-center">
            <Button type="submit" className="btn btn-primary">
              Edit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
