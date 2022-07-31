import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  & input {
    background-color: rgba(0, 0, 0, 0.5);
    color: #61626d;
    outline: none;
    border: none;
    text-align: center;
  }
`;

export default function PhaseTitleHardCode(props) {
  const { phase } = props;

  return (
    <Container>
      <TitleContainer show={true}>
        {`RECENTLY UNLOCKED`.toUpperCase()}
      </TitleContainer>
    </Container>
  );
}
