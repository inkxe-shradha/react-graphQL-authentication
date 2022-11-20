import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Header = ({ user, logOutMyApp }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
      <div className="container-xl">
        {/* <!-- Logo --> */}
        <a className="navbar-brand" href="#!">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png?20161105194737"
            className="h-8"
            alt="..."
          />
        </a>
        {/* <!-- Navbar toggle --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <!-- Collapse --> */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {/* <!-- Nav --> */}
          <div className="navbar-nav mx-lg-auto">
            <Link
              className="nav-item nav-link active"
              to="/"
              aria-current="page"
            >
              Home
            </Link>
            {user?.currentUser && (
              <>
                {" "}
                <a className="nav-item nav-link" href="#!">
                  Product
                </a>
                <a className="nav-item nav-link" href="#!">
                  Features
                </a>
                <a className="nav-item nav-link" href="#!">
                  Pricing
                </a>
              </>
            )}
          </div>
          {!user?.currentUser ? (
            <>
              <div className="navbar-nav ms-lg-4">
                <Link to={"auth/login"} className="nav-item nav-link">
                  Sign in
                </Link>
              </div>
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link
                  to={"auth/register"}
                  className="btn btn-sm btn-primary w-full w-lg-auto"
                >
                  Register
                </Link>
              </div>
            </>
          ) : (
            <div className="navbar-nav ms-lg-4">
              <a
                href="javascript:void(0)"
                onClick={logOutMyApp}
                className="nav-item nav-link"
              >
                Log Out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
