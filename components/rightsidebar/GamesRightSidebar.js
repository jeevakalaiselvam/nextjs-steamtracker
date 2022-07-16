import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${(props) => props.image});
  width: 300px;
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const GamesRightSidebar = (props) => {
  const { selectedGame } = props;
  const { achievements, completion, id, name, toGet, version } = selectedGame;
  return (
    <Container>
      <Image image={HEADER_IMAGE(id)}></Image>
    </Container>
  );
};

export default GamesRightSidebar;
