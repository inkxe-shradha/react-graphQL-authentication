import React from "react";
import "./index.css";
const Spinner = ({ isLoading = false }) => {
  return (
    isLoading && (
      <div className="spinner-div justify-content-center">
        <div className="d-flex justify-content-center h-100 align-item-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Spinner;
