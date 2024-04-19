import { useEffect, useState } from "react";
import styled from "styled-components";
import { useToDo } from "../hooks/useToDo";
import StyledList from "../styles/List";
import StyledSelect from "../styles/Select";
import { Todo } from "../types";
import { ToDoItem } from "./ToDoItem";
import { ToDoSetter } from "./ToDoSetter";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;

  .ml-auto {
    margin-left: auto;
    margin-right: 0;
  }
`;

export const App = () => {
  const savedToDoList = localStorage.getItem("toDoList");
  const initialToDoList: Todo[] = savedToDoList
    ? JSON.parse(savedToDoList)
    : [];
  const [toDoList, setToDoList] = useState(initialToDoList);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const { addToDo, deleteToDo, editToDo, checkToDo } = useToDo({
    setToDoList,
    toDoList,
    setInput,
  });

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <Container>
      <h1>To do list</h1>
      <div>
        <ToDoSetter onAdd={addToDo} input={input} setInput={setInput} />
      </div>
      <StyledSelect
        name="is_done"
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="to_be_done">To be done</option>
      </StyledSelect>
      <StyledList data-testid={"todo-list"}>
        {toDoList.map((todo: Todo, index: number) => {
          return (
            <ToDoItem
              key={index}
              todo={todo}
              onDelete={deleteToDo}
              onEdit={editToDo}
              onCheckToDo={checkToDo}
              filter={filter}
            />
          );
        })}
      </StyledList>
    </Container>
  );
};
