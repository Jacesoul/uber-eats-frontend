import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "../login";

describe("<Login />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(
        <Router>
          <HelmetProvider>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </HelmetProvider>
        </Router>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Uber Eats");
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i); // 정규식으로 i는 insensitive라는 의미
    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    debug();
  });
});
