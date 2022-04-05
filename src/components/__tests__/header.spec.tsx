import { render, waitFor } from "@testing-library/react";
import React from "react";
import { Header } from "../headers";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMe";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      const { debug, queryByText } = render(
        <Router>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: ME_QUERY,
                },
                result: {
                  data: {
                    me: {
                      id: 1,
                      email: "",
                      role: "",
                      verified: true,
                    },
                  },
                },
              },
            ]}
          >
            <Header email="emailTest" />
          </MockedProvider>
        </Router>
      );
      await new Promise((resolve) => setTimeout(resolve, 5));
      expect(queryByText("Please verify your email.")).toBeNull();
    });
  });

  it("renders without verify banner", async () => {
    await waitFor(async () => {
      const { debug, getByText } = render(
        <Router>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: ME_QUERY,
                },
                result: {
                  data: {
                    me: {
                      id: 1,
                      email: "",
                      role: "",
                      verified: false,
                    },
                  },
                },
              },
            ]}
          >
            <Header email="emailTest" />
          </MockedProvider>
        </Router>
      );
      getByText("Please verify your email.");
      await new Promise((resolve) => setTimeout(resolve, 5));
    });
  });
});
