import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: (o) => o.id,
  }),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
