import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  color: #9caabe;
  width: 100%;
  margin: 1rem 0rem 0.5rem 0;
`;

const SubMenu = (props) => {
  const { title } = props;
  return <Container>{title}</Container>;
};

export default SubMenu;
