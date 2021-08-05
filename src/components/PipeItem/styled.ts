import styled from "styled-components";

export const Wrapper = styled.div`
  width: calc(17% - 10px);
  background-color: ${(props) => props.theme.colors.frost};
  margin-bottom: 5px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-flow: column;
  min-height: 160px;
  box-shadow: ${(props) => props.theme.shadows.default};
  cursor: pointer;
  transition: 0.3s background-color;

  &:hover {
    background-color: ${(props) => props.theme.colors.teaGreen};
  }
`;

export const NameContainer = styled.div`
  width: 80%;
`;

export const NameText = styled.p`
  margin: 0;
  font-weight: bold;
  color: #666;
  line-height: 1.1;
`;

export const IconContainer = styled.div`
  width: 20%;
  margin: 0 auto;
  margin-top: 15px;
`;

export const CardsCountText = styled.p`
  color: ${(props) => props.theme.colors.doveGray};
  margin-top: auto;
  font-weight: 500;
`;
