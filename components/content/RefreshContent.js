import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import * as Loaders from 'react-spinners';
import styled from 'styled-components';
import { API_REFRESH_DATA } from '../../helper/apiHelper';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const RefreshContent = (props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const refreshData = async () => {
      const response = await axios.get(API_REFRESH_DATA());
      const { status } = response.data;
      if (status === 'success') {
        router.push('/games');
      }
    };
    refreshData();
  }, []);

  return <Container>{loading && <Loaders.HashLoader />}</Container>;
};

export default RefreshContent;
