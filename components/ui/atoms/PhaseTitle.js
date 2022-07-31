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

export default function PhaseTitle(props) {
  const { phase } = props;

  const [title, setTitle] = useState(``);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleInStorage =
        localStorage.getItem(`PHASE_${phase}_TITLE`) || `PHASE ${phase}`;

      setTitle((old) => titleInStorage);
    }
  }, [phase]);

  const [showTitle, setShowTitle] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const [editTitle, setEditTitle] = useState(title || `PHASE ${phase}`);

  useEffect(() => {
    setEditTitle((old) => title);
  }, [title]);

  return (
    <Container>
      <TitleContainer
        onClick={() => {
          setShowInput((old) => true);
          setShowTitle((old) => false);
        }}
        show={showTitle}
      >
        {editTitle.toUpperCase()}
      </TitleContainer>
      <InputContainer show={showInput}>
        <input
          type="text"
          placeholder={`PHASE ${phase}`}
          value={editTitle.toUpperCase()}
          onChange={(e) => {
            const value = e.target.value;
            if (typeof window !== "undefined") {
              localStorage.setItem(`PHASE_${phase}_TITLE`, value);

              e.target.addEventListener("keyup", function (event) {
                if (event.key === "Enter") {
                  setEditTitle((old) => value);
                  setShowInput((old) => false);
                  setShowTitle((old) => true);
                }
              });
            }
            setEditTitle((old) => value);
          }}
        />
      </InputContainer>
    </Container>
  );
}
