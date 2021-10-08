import React, { useState, useEffect } from "react";
import Logout from "../Auth/Logout";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Jumbotron } from "react-bootstrap";
import sampleTodoItems from "../../Utilities/sampleTodoItems";
import axios from "axios";
import FilterCat from "./FilterCat";

import SingleTodoItem from "./SingleTodoItem";
import TodoItemCreate from "./TodoItemCreate";

export default function TodoItems() {
  const { currentUser } = useAuth();
  const [todoitems, setTodoItems] = useState(sampleTodoItems);

  const [categories, setCategories] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [effectTrigger, setEffectTrigger] = useState(false);

  const [filter, setFilter] = useState(0);

  const getTodoItems = () => {
    axios.get("http://localhost:62432/api/Todo").then((response) => {
      setTodoItems(response.data);
    });
  };

  //-------- CREATE ---------/
  const addTodoItem = (todoitem) => {
    console.log(todoitem);

    axios.post("http://localhost:62432/api/Todo", todoitem).then((response) => {
      let updatedTodoItems = todoitems;

      updatedTodoItems.push(response.data);

      setTodoItems(updatedTodoItems);

      setEffectTrigger(!effectTrigger);

      setShowCreateForm(false);
    });
  };

  //--------- DELETE ------------//
  const deleteTodoItem = (todoitem) => {
    axios
      .delete(`http://localhost:62432/api/todo/${todoitem.TodoId}`)
      .then(() => {
        let updatedTodoItems = todoitems;

        let index = updatedTodoItems.findIndex(
          (x) => x.TodoId === todoitem.TodoId
        );

        updatedTodoItems.splice(index, 1);

        setTodoItems(updatedTodoItems);
        setEffectTrigger(!effectTrigger);
      });
  };

  const getCategories = () => {
    axios.get("http://localhost:62432/api/Categories").then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getTodoItems();
    getCategories();
  }, [effectTrigger]);

  return (
    <section className="todoitems">
      <Jumbotron className="m-0" style={{ backgroundColor: "lightblue" }}>
        <h1 className="text-center">Todo Items Dashboard</h1>
      </Jumbotron>
      <div className="bg-dark mb-3 p-3">
        {currentUser.email === "mikeprussell@outlook.com" && showCreateForm ? (
          <>
            <button
              onClick={() => setShowCreateForm(false)}
              className="btn btn-warning"
            >
              Cancel
            </button>
            <TodoItemCreate
              categories={categories}
              todoitems={todoitems}
              addTodoItem={addTodoItem}
            />
          </>
        ) : (
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            Create New Todo Item
          </button>
        )}
      </div>

      <FilterCat setFilter={setFilter} categories={categories} />
      <Container>
        <article className="todoitemGallery row justify-content-center ml-1">
          {filter === 0
            ? todoitems.map((x) => (
                <SingleTodoItem
                  key={x.TodoId}
                  todoitem={x}
                  deleteTodoItem={deleteTodoItem}
                  effectTrigger={effectTrigger}
                  setEffectTrigger={setEffectTrigger}
                  categories={categories}
                />
              ))
            : todoitems
                .filter((x) => x.CategoryId === filter)
                .map((x) => (
                  <SingleTodoItem
                    key={x.TodoId}
                    todoitem={x}
                    deleteTodoItem={deleteTodoItem}
                    effectTrigger={effectTrigger}
                    setEffectTrigger={setEffectTrigger}
                    categories={categories}
                  />
                ))}
          {filter !== 0 &&
            todoitems.filter((todoitem) => todoitem.CategoryId === filter)
              .length === 0 && (
              <h2 className="alert alert-warning text-dark">
                There are no results in this category.
              </h2>
            )}
        </article>
      </Container>
      {currentUser && <Logout />}
    </section>
  );
}
