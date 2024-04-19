import { Todo } from "../types";

type Props = {
  setToDoList: (TodoList: Todo[]) => void;
  toDoList: Todo[];
  setInput: (value: string) => void;
};

export const useToDo = ({ setToDoList, toDoList, setInput }: Props) => {
  const addToDo = (todo: string) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text: todo,
      completed: false,
    };
    // Add the to-do to the list
    setToDoList([...toDoList, newTodo]);
    // Clear input box
    setInput("");
  };

  const deleteToDo = (id: number) => {
    const newToDoList = toDoList.filter((todo: Todo) => todo.id !== id);
    setToDoList(newToDoList);
  };

  const editToDo = (id: number, newText: string) => {
    const updatedToDoList = [...toDoList].map((todo) => {
      if (todo.id === id) {
        todo.text = newText;
      }
      return todo;
    });
    setToDoList(updatedToDoList);
  };

  const checkToDo = (id: number) => {
    const checkedToDoList = [...toDoList].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setToDoList(checkedToDoList);
  };

  return { addToDo, deleteToDo, editToDo, checkToDo };
};
