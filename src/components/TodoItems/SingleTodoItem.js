import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../contexts/AuthContext";
import TodoItemEdit from "./TodoItemEdit";

library.add(fas);

export default function SingleTodoItem(props) {
  const { currentUser } = useAuth();

  const [showEdit, setShowEdit] = useState(false);

  const isDone = useState(props.todoitem.Done);

  return (
    <div className="singleTodoItem col-md-5 mx-4 mb-4 ">
      <h3>{props.todoitem.Action}</h3>
      <h4>Category: {props.todoitem.Category.CategoryName}</h4>
      {!isDone ? (
      <h4>Done: <span style={{ color: 'green' }}>Yes</span></h4>
      ) : (
        <h4>Done: <span style={{ color: 'red' }}>No</span></h4>
      )}
      
      {currentUser.email === "mikeprussell@outlook.com" && (
        <div>
          <button id="editLink" onClick={() => setShowEdit(!showEdit)}>
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </button>
          <button
            id="deleteLink"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${props.todoitem.Action}?`
                )
              ) {
                props.deleteTodoItem(props.todoitem);
              }
            }}
          >
            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
          </button>
        </div>
      )}
      {/* EDIT */}
      <TodoItemEdit
        todoitem={props.todoitem}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        effectTrigger={props.effectTrigger}
        setEffectTrigger={props.setEffectTrigger}
        categories={props.categories}
      />
    </div>
  );
}
