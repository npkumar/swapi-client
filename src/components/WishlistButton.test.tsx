import React from "react";
import WishlistButton from "./WishlistButton";
import { cleanup, fireEvent, render, screen } from "../test-utils";
import "@testing-library/jest-dom";

describe("WishlistButton", () => {
  afterEach(() => cleanup());

  it("should not be wishlisted", () => {
    const { getByTestId } = render(<WishlistButton resource="people" />, {
      initialState: { wishlist: [] },
    });

    expect(getByTestId("wishlistButton")).toBeInTheDocument();
    expect(screen.getByText(/Add to favorites/i)).toBeInTheDocument();
  });

  it("should be wishlisted", () => {
    const { getByTestId } = render(<WishlistButton resource="people" />, {
      initialState: { wishlist: ["people"] },
    });

    expect(getByTestId("wishlistButton")).toBeInTheDocument();
    expect(screen.getByText(/Remove from favorites/i)).toBeInTheDocument();
  });

  it("should remove from wishlist", () => {
    const { getByTestId, getByText } = render(
      <WishlistButton resource="people" />,
      {
        initialState: { wishlist: ["people"] },
      }
    );

    expect(getByTestId("wishlistButton")).toBeInTheDocument();
    expect(screen.getByText(/Remove from favorites/i)).toBeInTheDocument();

    fireEvent(
      getByText(/Remove from favorites/i),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByText(/Add to favorites/i)).toBeInTheDocument();
  });

  it("should add to wishlist", () => {
    const { getByTestId, getByText } = render(
      <WishlistButton resource="people" />,
      {
        initialState: { wishlist: [] },
      }
    );

    expect(getByTestId("wishlistButton")).toBeInTheDocument();
    expect(screen.getByText(/Add to favorites/i)).toBeInTheDocument();

    fireEvent(
      getByText(/Add to favorites/i),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByText(/Remove from favorites/i)).toBeInTheDocument();
  });
});
