import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CategoryEdit from "./CategoryEdit";

import { useAuth } from "../../contexts/AuthContext";

library.add(fas);

export default function SingleCategory(props) {
  const { currentUser } = useAuth();

  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <tr>
        <td>{props.category.CategoryName}</td>
        <td>{props.category.CategoryDescription}</td>
        {currentUser.email === "mikeprussell@outlook.com" && (
          <td>
            {/* EDIT Button */}
            <button
              className="m-1 rounded"
              id="editLink"
              onClick={() => setShowEdit(true)}
            >
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </button>
            <button
              className="m-1 rounded"
              id="deleteLink"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${props.category.CategoryName}?`
                  )
                ) {
                  props.deleteCategory(props.category);
                }
              }}
            >
              <FontAwesomeIcon icon={["fas", "trash-alt"]} />
            </button>
          </td>
        )}
      </tr>
      {/* EDIT UI */}
      {showEdit && (
        <CategoryEdit
          category={props.category}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          effectTrigger={props.effectTrigger}
          setEffectTrigger={props.setEffectTrigger}
        />
      )}
    </>
  );
}
