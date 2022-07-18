import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://avatars.cloudflare.steamstatic.com/3984d41a867b9b4eca056cdfcd1134bd591d9100_full.jpg');
  width: 70px;
  height: 70px;
  margin-bottom: 0.5rem;
  background-size: contain;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.75rem;
`;

const Profile = (props) => {
  return (
    <Container>
      <Image></Image>
      <Name>NotRealLogan</Name>
    </Container>
  );
};

export default Profile;
