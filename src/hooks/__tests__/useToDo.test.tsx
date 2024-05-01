import { renderHook } from "@testing-library/react";
import { useToDo } from "../../hooks/useToDo";

// Fixture: Mock Todo data
const mockTodos = [
  { id: 1, text: "Terminer le module 450", completed: true },
  { id: 2, text: "Prendre des vacances", completed: false },
];

describe("Unit tests for useToDo hook", () => {
  // Variables to store the mock function and the props for the hook
  let spy;
  let props;

  // Before each test, set up the mock function and the props for the hook
  beforeEach(() => {
    // Arrange: Set up the mock function and the props for the hook
    spy = jest.fn();
    props = {
      setToDoList: spy,
      toDoList: mockTodos,
      setInput: () => {},
    };
  });

  // Helper function to render the hook
  const renderUseToDo = () => {
    const { result } = renderHook(() => useToDo(props));
    return result.current;
  };

  // Test #1 : Unit test addToDo
  it("should add a new todo to the todo list", () => {
    // Act: Render the hook and call the addToDo function
    const { addToDo } = renderUseToDo();
    addToDo("Ajouter une nouvelle tâche");

    // Assert: Check that the setToDoList function was called with the correct arguments
    expect(spy).toHaveBeenCalledWith([
      { id: 1, text: "Terminer le module 450", completed: true },
      { id: 2, text: "Prendre des vacances", completed: false },
      { id: expect.any(Number), text: "Ajouter une nouvelle tâche", completed: false },
    ]);
  });

  // Test #3 : Unit test deleteToDo
  it("should delete a todo from the todo list", () => {
    // Act: Render the hook and call the deleteToDo function
    const { deleteToDo } = renderUseToDo();
    deleteToDo(1);

    // Assert: Check that the setToDoList function was called with the correct arguments
    expect(spy).toHaveBeenCalledWith([
      { id: 2, text: "Prendre des vacances", completed: false },
    ]);
  });
});
