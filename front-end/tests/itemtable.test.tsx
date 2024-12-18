import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ItemOverviewTable from "@components/items/ItemsOverviewtable";
import MenuService from "@services/menuService";
import { useTranslation } from "next-i18next";
import '@testing-library/jest-dom';

jest.mock("@services/menuService");
jest.mock("next-i18next", () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
  })),
}));

describe("ItemOverviewTable Component", () => {
  const mockDeleteItem = MenuService.deleteItem as jest.Mock;

  const mockProps = {
    items: [
      { id: 1, name: "Pizza", price: 10.5, category: "food" },
      { id: 2, name: "Soda", price: 2.0, category: "drink" },
    ],
    order: { 1: 2, 2: 3 },
    onQuantityChange: jest.fn(),
    updateItems: jest.fn(),
  };

  beforeEach(() => {
    mockDeleteItem.mockClear();
    mockProps.onQuantityChange.mockClear();
    mockProps.updateItems.mockClear();
    sessionStorage.clear();
  });

  test("renders table with items", () => {
    render(<ItemOverviewTable {...mockProps} />);

    expect(screen.getByText("menu.name")).toBeInTheDocument();
    expect(screen.getByText("menu.price")).toBeInTheDocument();

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("€10.50")).toBeInTheDocument();
    expect(screen.getByText("Soda")).toBeInTheDocument();
    expect(screen.getByText("€2.00")).toBeInTheDocument();
  });

  test("displays quantity inputs when user is logged in", () => {
    sessionStorage.setItem("username", "testuser");

    render(<ItemOverviewTable {...mockProps} />);

    const quantityInputs = screen.getAllByRole("spinbutton");
    expect(quantityInputs.length).toBe(2);
    expect(quantityInputs[0]).toHaveValue(2);
    expect(quantityInputs[1]).toHaveValue(3);
  });

  test("calls onQuantityChange when quantity input changes", () => {
    sessionStorage.setItem("username", "testuser");

    render(<ItemOverviewTable {...mockProps} />);

    const quantityInput = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(quantityInput, { target: { value: "5" } });

    expect(mockProps.onQuantityChange).toHaveBeenCalledWith(1, 5);
  });

  test("navigates to the update page when update button is clicked", () => {
    sessionStorage.setItem("role", "admin");

    render(<ItemOverviewTable {...mockProps} />);

    const updateLink = screen.getAllByText("Update")[0];
    expect(updateLink.closest("a")).toHaveAttribute("href", "/menu/update/1");
  });
});
