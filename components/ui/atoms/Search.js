import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiSearch } from 'react-icons/hi';

const Container = styled.div`
  display: flex;

  
`;

const SearchIcon = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background: #000000;
  padding: 0.5rem 1rem;
  border-radius: 8px  0px 0px 8px;
`;

const SearchInput = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  
  & input{
      outline: none;
      padding: 0.5rem;
      width: 150px;
      background: #000000;
      color:#3c3d3f;
      border:none;
      border-radius: 0px 8px 8px 0px;
  }
`;

const Search = (props) => {
  const { onSearchObtained } = props;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchTerm !== '' && onSearchObtained(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const searchTermChanged = (e) => {
    const data = e.target.value;
    setSearchTerm((old) => data);
  };

  return (
    <Container>
      <SearchIcon>
        <HiSearch />
      </SearchIcon>
      <SearchInput>
        <input
          type="text"
          value={searchTerm}
          onChange={searchTermChanged}
          placeholder="Search..."
        />
      </SearchInput>
    </Container>
  );
};

export default Search;