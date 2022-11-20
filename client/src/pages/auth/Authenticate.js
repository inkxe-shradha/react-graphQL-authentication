import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { loginMutation, singUpMutation } from "../../mutations/loginMutations";
import { CURRENT_USER } from "../../querise/currentUser";
import { UserContext } from "../../store/UserContext";

const Authenticate = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginToMe, { loading, error }] = useMutation(loginMutation, {
    refetchQueries: [
      {
        query: CURRENT_USER,
      },
    ],
  });
  const [signUp, { loading: signupLoader, error: signUpError }] = useMutation(
    singUpMutation,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: CURRENT_USER,
        },
      ],
    }
  );
  if (currentUser) {
    return <Navigate to={"/"} />;
  }
  const loginToMeTheApp = (e) => {
    e.preventDefault();
    if (id === "register") {
      signUp({
        variables: {
          email: userName,
          password: password,
        },
      });
    } else {
      loginToMe({
        variables: {
          email: userName,
          password: password,
        },
      }).then((res) => console.log(res));
    }
  };
  return (
    <>
      <Spinner isLoading={loading || signupLoader} />;
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow">
              <div className="card-title text-center border-bottom">
                <h2 className="p-3">Login</h2>
              </div>
              <div className="card-body">
                {((error && error.message) ||
                  (signUpError && signUpError.message)) && (
                  <div className="alert alert-danger">
                    {error && error.message.split('"')[1]}
                    {signUpError && signUpError.message}
                  </div>
                )}
                <form onSubmit={loginToMeTheApp}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                      Username/Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="username"
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label htmlFor="remember" className="form-label">
                      Remember Me
                    </label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn text-light main-bg">
                      {id === "register" ? "Register" : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
