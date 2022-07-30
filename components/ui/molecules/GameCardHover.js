import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_GET_GAME } from "../../../helper/apiHelper";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import { HiClock, HiCollection } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import { GAME_SETTING_DISPLAY_VISIBLE } from "../../../helper/filterHelper";
import axios from "axios";
import { LOCALSTORAGE_GAME_SELECTED } from "../../../helper/storageHelper";
import { formatAchievments } from "../../../helper/achievementHelper";
import { getRemainingXP } from "../../../helper/xpHelper";
import { MdIncompleteCircle } from "react-icons/md";
import { useRouter } from "next/router";

const Container = styled.div`
  display: "flex";
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: ${(props) => props.width || "350px"};
  height: ${(props) => props.height || "170px"};
  margin: 0.5rem;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.85);
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fefefe;
  left: 0px;
  width: 100%;
  padding: 0.5rem 1rem;
  max-height: 30px;

  &:hover {
    color: #3049d1;
  }
`;

const CompletionContainer = styled.div`
  position: absolute;
  top: 0;
  padding: 1rem;
  left: 0;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.85);
  transform: translateX(
    ${(props) => (props.showIcons || props.forceShowIcons ? "0%" : "-100%")}
  );
`;

const ToGetContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.85);
  transform: translateX(
    ${(props) => (props.showIcons || props.forceShowIcons ? "0%" : "100%")}
  );
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 2.25rem;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  font-size: 1.25rem;
`;

const CompletionIcon = styled.div`
  display: flex;
  align-items: center;
  color: #3470d2;
  font-size: 2.25rem;
  justify-content: center;
`;

const CompletionData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #3470d2;
`;

const XPContainer = styled.div`
  position: absolute;
  top: 0;
  padding: 1rem;
  left: 50%;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.85);
  transform: translate(
    -50%,
    ${(props) => (props.showIcons || props.forceShowIcons ? "0%" : "-100%")}
  );
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  color: #fefefe;
  font-size: 2.25rem;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #fefefe;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${(props) => props.color};
`;

const CompletionTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GameCardHover(props) {
  const {
    openRightSidebar,
    closeRightSidebar,
    game,
    gamesDisplayOption,
    onGameInitialChanged,
    navigateToGame,
  } = props;
  const {
    appid,
    gameName,
    completed,
    total,
    percentage,
    schemaAchievements,
    playerAchievements,
    globalAchievements,
  } = game;

  const [showIcons, setShowIcons] = useState(false);
  const [forceShowIcons, setForceShowIcons] = useState(
    JSON.parse(localStorage.getItem(`PINNED_${appid}`))
  );
  const router = useRouter();

  const formattedAchievements = formatAchievments(
    schemaAchievements,
    globalAchievements,
    playerAchievements
  );
  const remainingXP = getRemainingXP(formattedAchievements);

  const getColor = (percentageInner) => {
    if (percentageInner == 100) {
      return "#f5b81c";
    } else if (percentage >= 75 && percentage < 100) {
      return "#882cc7";
    } else {
      return "#17d155";
    }
  };

  return (
    <Container
      image={HEADER_IMAGE(appid)}
      onMouseEnter={() => {
        setShowIcons((old) => true);
      }}
      onMouseLeave={() => {
        setShowIcons((old) => false);
      }}
      onClick={() => {
        // openRightSidebar(game);
      }}
    >
      <Overlay color={getColor(percentage)}>
        {percentage == 100 && <FaTrophy />}
      </Overlay>
      <Title
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem(
              LOCALSTORAGE_GAME_SELECTED,
              JSON.stringify(game)
            );
            if (navigateToGame) {
              router.push(`/planner`);
            } else {
              onGameInitialChanged(game);
            }
          }
        }}
      >
        {gameName}
      </Title>
      <ToGetContainer showIcons={showIcons} forceShowIcons={forceShowIcons}>
        <ToGetIcon>
          <FaTrophy />
        </ToGetIcon>
        <ToGetData>{total - completed}</ToGetData>
      </ToGetContainer>
      <CompletionContainer
        showIcons={showIcons}
        forceShowIcons={forceShowIcons}
      >
        <CompletionIcon>
          <MdIncompleteCircle />
        </CompletionIcon>
        <CompletionData>{percentage} %</CompletionData>
      </CompletionContainer>

      {
        <XPContainer
          showIcons={showIcons}
          forceShowIcons={forceShowIcons}
          onClick={(e) => {
            if (typeof window !== "undefined") {
              if (JSON.parse(localStorage.getItem(`PINNED_${appid}`)) == true) {
                localStorage.setItem(`PINNED_${appid}`, JSON.stringify(false));
                setForceShowIcons((old) => false);
              } else {
                localStorage.setItem(`PINNED_${appid}`, JSON.stringify(true));
                setForceShowIcons((old) => true);
              }
            }
          }}
        >
          <XPIcon>
            <HiCollection />
          </XPIcon>
          <XPData>{remainingXP} XP</XPData>
        </XPContainer>
      }
    </Container>
  );
}
