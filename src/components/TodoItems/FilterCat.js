import React from "react";

export default function FilterCat(props) {
  return (
    /* Category button */
    <div className="text-center mt-5 ml-1">
      <button
        onClick={() => props.setFilter(0)}
        className="btn btn-outline-primary bg-dark m-1"
      >
        All
      </button>
      {/* Maps each category to a button */}
      {props.categories.map((cat) => (
        <button
          key={cat.CategoryId}
          onClick={() => props.setFilter(Number(cat.CategoryId))}
          className="btn btn-outline-primary bg-muted m-1"
        >
          {cat.CategoryName}
        </button>
      ))}
    </div>
  );
}
