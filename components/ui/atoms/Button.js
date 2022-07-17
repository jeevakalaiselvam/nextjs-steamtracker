import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 1rem;
  background-color: #3049d1;
  color: #fefefe;
  cursor: pointer;
  background: ${(props) => {
    if (props.hover && !props.click) {
      return '#1e33a6';
    } else if (props.hover && props.click) {
      return '#15278c';
    } else {
      return '#3049d1';
    }
  }};
`;

const Button = (props) => {
  const { title, onClick } = props;

  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  const onItemClick = () => {
    setClick((old) => true);
    onClick();
  };

  return (
    <Container
      click={click}
      hover={hover}
      onMouseEnter={() => {
        setHover((old) => true);
      }}
      onMouseLeave={() => {
        setHover((old) => false);
        setClick((old) => false);
      }}
      onClick={onItemClick}
    >
      {title}
    </Container>
  );
};

export default Button;
