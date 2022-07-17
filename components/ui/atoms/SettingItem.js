import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;
const Component = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingItem = (props) => {
  const { title, component } = props;
  return (
    <Container>
      <Title>{title}</Title>
      <Component>{component}</Component>
    </Container>
  );
};

export default SettingItem;
