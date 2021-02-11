import App from "./App";
import React from "react";
import { cleanup, render, screen } from "../test-utils";
import "@testing-library/jest-dom";

describe("App", () => {
  afterEach(() => cleanup());

  it("should render", () => {
    render(
      <App>
        <></>
      </App>,
      {
        initialState: {
          root: {
            isLoading: false,
            payload: {
              results: [
                { name: "Human", url: "1" },
                { name: "Wookie", url: "2" },
              ],
            },
          },
          roots: {
            isLoading: false,
            payload: {
              people: {},
              place: {},
            },
          },
          wishlist: [],
        },
      }
    );
    expect(screen.getByText(/People/i)).toBeInTheDocument();
    expect(screen.getByText(/Place/i)).toBeInTheDocument();
  });
});
