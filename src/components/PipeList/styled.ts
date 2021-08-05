import styled from "styled-components";

export const PipeItemsWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.wePeep};
  margin-left: 20px;
  border: 0;
  padding: 10px 25px;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadows.default};
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => props.theme.shadows.scorpion};
  transition: 0.3s background-color;

  &:hover {
    background-color: ${(props) => props.theme.colors.yourPink};
  }
`;

export const EndOfListText = styled.p`
  margin-left: 20px;
`;
