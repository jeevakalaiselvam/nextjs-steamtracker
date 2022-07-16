import React, { useState } from "react";
import styled from "styled-components";

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
  overflow: scroll;
  background-color: #1e1e1e;
  color: #61626d;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  color: #61626d;
`;

const Content = styled.div`
  flex: 1;
  color: #61626d;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
`;

const RightSidebar = styled.div`
  width: 500px;
  min-height: 100vh;
  background: #171717;
  color: #ffffff;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  display: ${(props) => (props.showRightSidebar ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.5s;
`;

const Page = (props) => {
  const { leftSidebar, rightSidebar, content, header, showRightSidebar } =
    props;

  return (
    <Container>
      <LeftSidebar>{leftSidebar}</LeftSidebar>
      <Main>
        <Header>{header}</Header>
        <Content>{content}</Content>
      </Main>
      <RightSidebar showRightSidebar={showRightSidebar}>
        {rightSidebar}
      </RightSidebar>
    </Container>
  );
};

export default Page;
