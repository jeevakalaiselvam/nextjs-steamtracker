import React from 'react';
import styled from 'styled-components';
import Search from '../ui/atoms/Search';
import Filter from '../ui/atoms/Filter';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const SearchContainer = styled.div`
  flex: 1;
  display:flex;
  align-items:center;
  justify-content:flex-end;
`;

const FilterContainer = styled.div`
  flex: 1;
  display:flex;
  align-items:center;
  justify-content:flex-start;
`;

const GamesHeader = (props) => {
  const filterOptions = [
    {
      id: 1,
      title: 'Filter by Completion',
    },
  ];

  const onSearchObtained = (searchTerm) => {
    console.log('Search Term Obtained -', searchTerm);
  };

  const onFilterChanged = (filterItem) => {
    console.log('Filter Item Changed -', filterItem);
  };

  return (
    <Container>
      <FilterContainer>
        <Filter
          onFilterChanged={onFilterChanged}
          filterOptions={filterOptions}
        />
      </FilterContainer>
      <SearchContainer>
        <Search onSearchObtained={onSearchObtained} />
      </SearchContainer>
    </Container>
  );
};

export default GamesHeader;
