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

const Sidebar = styled.div`
  width: 250px;
  min-height: 100vh;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
`;

const Main = styled.div`
  flex: 1;
  background: green;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  background: orange;
`;

const Content = styled.div`
  flex: 1;
  background: blue;
  min-height: 100vh;
  overflow: scroll;
  scrollbar-width: none; /* "auto" or "thin" */
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
`;

const Page = (props) => {
  const { sidebar, content, header } = props;
  return (
    <Container>
      <Sidebar>{sidebar}</Sidebar>
      <Main>
        <Header>{header}</Header>
        <Content>{content}</Content>
      </Main>
    </Container>
  );
};

export default Page;
