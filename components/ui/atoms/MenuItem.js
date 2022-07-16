import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction:row;
`;

const Title = styled.div`
  display: flex;
`;

const Icon = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  margin-right: 1rem;
`;

const MenuItem = (props) => {
  const { title, icon, onClick } = props;
  return (
    <Container onClick={onClick}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Container>
  );
};

export default MenuItem;
