import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { CURRENT_USER } from "../querise/currentUser";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../components/spinner/Spinner";
import { logOutMutation } from "../mutations/logOutMutation";
import ErrorPage from "../components/error/Error";
import { UserContext } from "../store/UserContext";

const Home = () => {
  let isLoading = true;
  const { loading: fetchSessionLoading, data } = useQuery(CURRENT_USER);
  const navigation = useNavigate();
  const [logOut, { loading: logOutLoader, error }] = useMutation(
    logOutMutation,
    {
      refetchQueries: [
        {
          query: CURRENT_USER,
        },
      ],
    }
  );
  isLoading = fetchSessionLoading || logOutLoader;
  const logOutMyApp = () => {
    console.log("Loggin Out");
    logOut();
    navigation("/");
  };
  const contextValue = {
    currentUser: data?.currentUser,
    isAuthenticated: data?.currentUser,
  };
  return error ? (
    <ErrorPage />
  ) : (
    <>
      <Spinner isLoading={isLoading} />
      <Header user={data} logOutMyApp={logOutMyApp} />
      <UserContext.Provider value={contextValue}>
        <main>
          <Outlet />
        </main>
      </UserContext.Provider>
    </>
  );
};

export default Home;
