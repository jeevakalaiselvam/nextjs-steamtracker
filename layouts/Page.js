import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`;

const LeftSidebar = styled.div`
  width: 200px;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #171717;
  color: #ffffff;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Main = styled.div`
  flex: 1;
  background: green;
  background-color: #1e1e1e;
  color: #61626d;
  min-height: 100vh;
  max-height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  color: #61626d;
`;

const Content = styled.div`
  flex: 1;
  color: #61626d;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
`;

const RightSidebar = styled.div`
  width: 520px;
  min-height: 100vh;
  max-height: 100vh;
  background: #171717;
  color: #ffffff;
  display: ${(props) => (props.showRightSidebar ? 'flex' : 'flex')};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: translateX(${(props) => (props.showRightSidebar ? '0%' : '100%')});
  transition: all 0.5s;
`;

const Page = (props) => {
  const { leftSidebar, rightSidebar, content, header, showRightSidebar } =
    props;

  return (
    <Container>
      {leftSidebar && <LeftSidebar>{leftSidebar}</LeftSidebar>}
      <Main>
        {header && <Header>{header}</Header>}
        {content && <Content>{content}</Content>}
      </Main>
      {rightSidebar && (
        <RightSidebar showRightSidebar={true}>{rightSidebar}</RightSidebar>
      )}
    </Container>
  );
};

export default Page;
