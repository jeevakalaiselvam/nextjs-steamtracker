import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  overflow: hidden;
`;

const LeftSidebar = styled.div`
  width: 200px;
  min-height: 100vh;
  background-color: #0d0c0f;
  color: #ffffff;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:flex-start;
`;

const Main = styled.div`
  flex: 1;
  background: green;
  background-color: #1e1f23;
  color: #61626d;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  color: #61626d;
`;

const Content = styled.div`
  flex: 1;
  min-height: 100vh;
  color: #61626d;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
`;

const RightSidebar = styled.div`
  width: 200px;
  min-height: 100vh;
  background: #151718;
  color: #ffffff;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:flex-start;
`;

const Page = (props) => {
  const { leftSidebar, rightSidebar, content, header } = props;
  return (
    <Container>
      <LeftSidebar>{leftSidebar}</LeftSidebar>
      <Main>
        <Header>{header}</Header>
        <Content>{content}</Content>
      </Main>
      <RightSidebar>{rightSidebar}</RightSidebar>
    </Container>
  );
};

export default Page;
