import React from 'react';
import styled from 'styled-components';
import Search from '../ui/atoms/Search';
import Filter from '../ui/atoms/Filter';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FilterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const GameHeader = (props) => {
  const { searchTextChanged, onFilterChanged, filterOptions } = props;

  return (
    <Container>
      <FilterContainer>
        <Filter
          onFilterChanged={onFilterChanged}
          filterOptions={filterOptions}
        />
      </FilterContainer>
      <SearchContainer>
        <Search onSearchObtained={searchTextChanged} />
      </SearchContainer>
    </Container>
  );
};

export default GameHeader;
