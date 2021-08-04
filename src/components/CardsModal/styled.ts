import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0 0 0 / 57%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;
