import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Login, LOGIN_MUTAION } from "../login";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <Router>
          <HelmetProvider>
            <ApolloProvider client={mockClient}>
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
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  it("display password required errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "jace@naver.com");
      userEvent.click(submitBtn);
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
    debug();
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "1q2w3e4r5t",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "xxx",
          error: null,
        },
      },
    });
    mockClient.setRequestHandler(LOGIN_MUTAION, mockedMutationResponse);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: { email: formData.email, password: formData.password },
    });
  });
});
