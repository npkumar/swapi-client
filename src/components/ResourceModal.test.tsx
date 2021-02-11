import React from "react";
import ResourceModal from "./ResourceModal";
import { cleanup, render, screen } from "../test-utils";
import "@testing-library/jest-dom";

describe("ResourceModal", () => {
  afterEach(() => cleanup());

  it("should render after loading", () => {
    render(<ResourceModal onRequestClose={() => {}} />, {
      initialState: {
        resource: {
          isLoading: false,
          payload: {
            race: "Human",
            type: "Mech",
          },
        },
      },
    });
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Mech/i)).toBeInTheDocument();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();
  });

  it("should render while loading", () => {
    render(<ResourceModal onRequestClose={() => {}} />, {
      initialState: {
        resource: {
          isLoading: true,
        },
      },
    });
    expect(screen.queryByText(/Human/i)).toBeNull();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();
  });
});
