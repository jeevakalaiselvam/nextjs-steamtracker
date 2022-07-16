import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  color: #2bebc7;
  width: 100%; 
  margin: 1rem 0rem;
`;

const SubMenu = (props) => {
  const { title } = props;
  return <Container>{title}</Container>;
};

export default SubMenu;
