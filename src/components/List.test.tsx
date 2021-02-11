import React from "react";
import List from "./List";
import { cleanup, render, screen } from "../test-utils";
import "@testing-library/jest-dom";

describe("List", () => {
  afterEach(() => cleanup());

  it("should render after loading", () => {
    render(<List />, {
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
      },
    });
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Wookie/i)).toBeInTheDocument();
  });

  it("should render while loading", () => {
    render(<List />, {
      initialState: {
        root: {
          isLoading: true,
        },
      },
    });
    expect(screen.queryByText(/Human/i)).toBeNull();
  });
});
