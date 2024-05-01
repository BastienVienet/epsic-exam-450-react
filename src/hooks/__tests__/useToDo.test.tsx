import { renderHook } from "@testing-library/react";
import { useToDo } from "../../hooks/useToDo";

// Fixture: Mock Todo data
const mockTodos = [
  { id: 1, text: "Terminer le module 450", completed: true },
  { id: 2, text: "Prendre des vacances", completed: false },
];

// Unit Test
it("should add a new todo to the todo list", () => {
  // Arrange: Set up the mock function and the props for the hook
  const spy = jest.fn();
  const props = {
    setToDoList: spy,
    toDoList: mockTodos,
    setInput: () => {},
  };

  // Act: Render the hook and call the addToDo function
  const { result } = renderHook(() => useToDo(props));
  result.current.addToDo("Ajouter une nouvelle tâche");

  // Assert: Check that the setToDoList function was called with the correct arguments
  expect(spy).toHaveBeenCalledWith([
    { id: 1, text: "Terminer le module 450", completed: true },
    { id: 2, text: "Prendre des vacances", completed: false },
    { id: expect.any(Number), text: "Ajouter une nouvelle tâche", completed: false },
  ]);
});

// Unit Test
it("should delete a todo from the todo list", () => {
  // Arrange: Set up the mock function and the props for the hook
  const spy = jest.fn();
  const props = {
    setToDoList: spy,
    toDoList: mockTodos,
    setInput: () => {},
  };

  // Act: Render the hook and call the deleteToDo function
  const { result } = renderHook(() => useToDo(props));
  result.current.deleteToDo(1);

  // Assert: Check that the setToDoList function was called with the correct arguments
  expect(spy).toHaveBeenCalledWith([
    { id: 2, text: "Prendre des vacances", completed: false },
  ]);
});
