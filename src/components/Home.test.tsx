import Home from "./Home";
import React from "react";
import { cleanup, render, screen } from "../test-utils";
import "@testing-library/jest-dom";

describe("Home", () => {
  afterEach(() => cleanup());

  it("should render after loading", () => {
    render(<Home />, {
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
      },
    });
    expect(screen.getByText(/People/i)).toBeInTheDocument();
    expect(screen.getByText(/Place/i)).toBeInTheDocument();
  });

  it("should render while loading", () => {
    render(<Home />, {
      initialState: {
        root: {
          isLoading: true,
        },
        roots: {
          isLoading: true,
        },
      },
    });
    expect(screen.queryByText(/People/i)).toBeNull();
    expect(screen.queryByText(/Person/i)).toBeNull();
  });
});
