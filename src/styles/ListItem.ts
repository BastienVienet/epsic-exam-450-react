import styled from "styled-components";

const StyledListItem = styled.li<{ completed?: boolean }>`
  ${({ completed = false }) =>
    completed ? "text-decoration-line: line-through;" : ""}

  display: flex;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  background: white;
  color: black;

  &:nth-child(odd) {
    background-color: #efefef;
  }
  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 20px;
    cursor: pointer;
  }
`;

export default StyledListItem;
