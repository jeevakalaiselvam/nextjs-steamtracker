import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Filter from '../atoms/Filter';
import SettingItem from '../atoms/SettingItem';

const Container = styled.div`
  display: flex;
  background-color: #171717;
  width: 450px;
  height: 400px;
  flex-direction: column;
  align-items: center;
  color: #484848;
  padding: 2rem;
  justify-content: flex-start;
  margin: 0rem 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
  font-size: 1.75rem;
`;

const Component = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`;

const SettingCard = (props) => {
  const { title, component, navigateTo } = props;
  const router = useRouter();
  return (
    <Container>
      <Header>{title}</Header>
      <Component>{component && component}</Component>
      <Button
        title="SAVE"
        onClick={() => {
          router.push(navigateTo);
        }}
      />
    </Container>
  );
};

export default SettingCard;
