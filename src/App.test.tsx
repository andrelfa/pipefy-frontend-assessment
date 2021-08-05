import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "uri",
  cache: new InMemoryCache(),
});

test("renders component without crashing", () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
});
