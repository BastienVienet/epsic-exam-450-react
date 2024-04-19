import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  border: 2px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 12px 8px;
  font-size: 16px;
  font-weight: 600;
  transition: transform 200ms, background 200ms;
  background: transparent;
  color: #000000;
  box-shadow: 0 0 0 2px #000000 inset;
  :hover {
    transform: translateY(-2px);
  }
`;

export default StyledButton;
