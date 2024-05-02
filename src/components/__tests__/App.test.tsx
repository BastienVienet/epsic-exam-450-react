import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import React from "react";
import { App } from "../App";

describe("Integration tests for App component", () => {
  // Test #2 : Integration test for adding a todo and updating it
  it("should add a todo and update it", async () => {
    // Arrange: Render the component
    render(<App />);

    // Act: Simulate user adding a todo
    fireEvent.change(screen.getByRole("textbox", { name: "Add todo" }), {
      target: { value: "Terminer le module 450" },
    });
    fireEvent.click(screen.getByText("Add"));

    // Act: Simulate user clicking the edit button
    fireEvent.click(screen.getByLabelText("edit"));

    // Act: Simulate user submitting a new text
    const todoItem = screen.getByRole("listitem");
    const textBox = within(todoItem).getByRole("textbox", {
      name: "Edit todo",
    });
    fireEvent.change(textBox, {
      target: { value: "Terminer le module 450 et le tester" },
    });
    fireEvent.click(within(todoItem).getByLabelText("save"));

    // Assert: Check that the new text is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Terminer le module 450 et le tester")
      ).toBeInTheDocument();
    });
  });
});
