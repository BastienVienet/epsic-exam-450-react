import { KeyboardEvent } from "react";
import StyledButton from "../styles/Button";
import StyledInput from "../styles/Input";

type Props = {
  onAdd: (input: string) => void;
  input: string;
  setInput: (value: string) => void;
};

export const ToDoSetter = ({ onAdd, input, setInput }: Props) => {
  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onAdd(input);
    }
  };
  return (
    <>
      <StyledInput
        aria-label="Add todo"
        onKeyDown={handleEnterPress}
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <StyledButton onClick={() => onAdd(input)}>Add</StyledButton>
    </>
  );
};
