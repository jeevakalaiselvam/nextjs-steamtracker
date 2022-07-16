import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: '100%';
  align-items: center;
  padding: 0.5rem;
  color: #fefefe;
  justify-content: 'center';
  margin: 0.25rem;

  & select {
    background: #171717;
    border: none;
    outline: none;
    color: #9caabe;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  & option {
    background: #171717;
    border: none;
    outline: none;
    color: #9caabe;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export default function Filter({ filterOptions, onFilterChanged }) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected((old) => filterOptions[0]);
  }, []);

  const optionChangeHandler = (event) => {
    const selectedValue = event.target.value;
    onFilterChanged(selectedValue);
  };

  return (
    <Container>
      <select name="sort" key="sort" onChange={optionChangeHandler}>
        {filterOptions &&
          filterOptions.length > 0 &&
          filterOptions.map((filterOption) => {
            return (
              <option key={filterOption.id} value={filterOption.id}>
                {filterOption.title}
              </option>
            );
          })}
      </select>
    </Container>
  );
}
