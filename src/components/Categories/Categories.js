import React, { useState, useEffect } from "react";
import Logout from "../Auth/Logout";
import sampleCategories from "../../Utilities/sampleCategories";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Card, Jumbotron } from "react-bootstrap";
import axios from "axios";

import CategoryCreate from "./CategoryCreate";

import SingleCategory from "./SingleCategory";

export default function Categories() {
  const [categories, setCategories] = useState(sampleCategories);

  const { currentUser } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [effectTrigger, setEffectTrigger] = useState(false);

  //--------- READ --------------//
  const getCategories = () => {
    axios.get("http://localhost:62432/api/Categories").then((response) => {
      setCategories(response.data);
    });
  };

  //-------- CREATE -----------//
  const addCategory = (category) => {
    axios
      .post("http://localhost:62432/api/Categories", category)
      .then((response) => {
        let updatedCategories = categories;

        updatedCategories.push(response.data);

        setCategories(updatedCategories);

        setEffectTrigger(!effectTrigger);

        setShowCreateForm(false);
      });
  };

  //------- DELETE ---------//
  const deleteCategory = (category) => {
    axios
      .delete(`http://localhost:62432/api/Categories/${category.CategoryId}`)
      .then(() => {
        let updatedCategories = categories;

        let index = updatedCategories.findIndex(
          (x) => x.CategoryId === category.CategoryId
        );

        updatedCategories.splice(index, 1);

        setCategories(updatedCategories);

        setEffectTrigger(!effectTrigger);
      });
  };
  useEffect(() => {
    getCategories();
  }, [effectTrigger]);

  return (
    <section className="categories">
      <Jumbotron className="m-0" style={{backgroundColor: "lightblue"}}>
        <h1 className="text-center">Categories Dashboard</h1>
      </Jumbotron>
      {/* Create UI */}
      <div className="bg-dark mb-3 p-3">
        {currentUser.email === "mikeprussell@outlook.com" && showCreateForm ? (
          <>
            <button
              onClick={() => setShowCreateForm(false)}
              className="btn btn-warning"
            >
              Cancel
            </button>
            <CategoryCreate categories={categories} addCategory={addCategory} />
          </>
        ) : (
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            Create New Category
          </button>
        )}
      </div>
      <Container>
        <table className="table table-striped table-light rounded mt-3 mb-3">
          <thead className="bg-secondary text-uppercase text-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              {currentUser.email === "mikeprussell@outlook.com" && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* EDIT Mapping */}
            {categories.map((cat) => (
              <SingleCategory
                key={cat.CategoryId}
                category={cat}
                deleteCategory={deleteCategory}
                effectTrigger={effectTrigger}
                setEffectTrigger={setEffectTrigger}
              />
            ))}
          </tbody>
        </table>
      </Container>
      {currentUser && <Logout />}
    </section>
  );
}