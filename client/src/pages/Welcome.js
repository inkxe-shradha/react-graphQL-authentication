import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import "./index.css";
const Welcome = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div
        className="animate__animated animate bounce card "
        style={{ width: "18rem" }}
      >
        <div className="container mt-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png?20161105194737"
            className="card-img-top "
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="card-title ms-1"> GraphQL Auth</h5>
          <p className="card-text mb-5 ms-1">
            Welcome to GraphQL Auth Tutorial.
          </p>
          {currentUser ? (
            <p className="text-center fw-bolder"> Welcome {currentUser.email}</p>
          ) : (
            <Link
              to={"/auth/login"}
              className="btn btn-primary btn-round mb-1 mt-1 "
              rel="noreferrer"
            >
              Sign In Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
