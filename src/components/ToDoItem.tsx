import { KeyboardEvent, useRef, useState } from "react";
import { MdCancel, MdDelete, MdEdit, MdSave } from "react-icons/md";
import styled from "styled-components";
import StyledButton from "../styles/Button";
import StyledCheckbox from "../styles/Checkbox";
import StyledInput from "../styles/Input";
import StyledListItem from "../styles/ListItem";
import { Todo } from "../types";

const MyInput = styled(StyledInput)`
  display: inline;
  margin-left: 57px;
  min-width: 0;
  width: 300px;
`;

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, value: string) => void;
  onCheckToDo: (id: number) => void;
  filter: string;
};

export const ToDoItem = ({
  todo,
  onDelete,
  onEdit,
  onCheckToDo,
  filter,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const todoOldTextRef = useRef(null);
  const inputTextRef = useRef<HTMLInputElement>(null);
  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (!inputTextRef.current) return;
      onEdit(todo.id, inputTextRef.current.value);
      setIsEditing(false);
    }
  };

  if (
    (filter === "completed" && !todo.completed) ||
    (filter === "to_be_done" && todo.completed)
  ) {
    return null;
  }

  return isEditing ? (
    <StyledListItem>
      <MyInput
        aria-label="Edit todo"
        ref={inputTextRef}
        type="text"
        defaultValue={todo.text}
        onKeyDown={handleEnterPress}
      />
      <div className="ml-auto">
        <StyledButton
          aria-label="save"
          onClick={() => {
            if (!inputTextRef.current) return;
            onEdit(todo.id, inputTextRef.current.value);
            setIsEditing(false);
          }}
        >
          <MdSave></MdSave>
        </StyledButton>
        <StyledButton
          aria-label="cancel edit"
          onClick={() => setIsEditing(false)}
        >
          <MdCancel></MdCancel>
        </StyledButton>
      </div>
    </StyledListItem>
  ) : (
    <StyledListItem completed={todo.completed} data-testid={"todo-item"}>
      <StyledCheckbox
        type="checkbox"
        name={`todo-${todo.id}`}
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => onCheckToDo(todo.id)}
      />
      <label htmlFor={`todo-${todo.id}`}>
        <div ref={todoOldTextRef}>{todo.text}</div>
      </label>
      <div className="ml-auto">
        <StyledButton onClick={() => onDelete(todo.id)}>
          <MdDelete aria-label="delete"></MdDelete>
        </StyledButton>
        <StyledButton aria-label="edit" onClick={() => setIsEditing(true)}>
          <MdEdit></MdEdit>
        </StyledButton>
      </div>
    </StyledListItem>
  );
};
