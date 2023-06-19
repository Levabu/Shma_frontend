import React, { useState } from 'react'
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import SearchModal from './SearchModal';

export default function SearchButton() {
    const [isModalOpened, setIsModalOpened] = useState(false);


    return (
        <>
        <Button onClick={() => {
          setIsModalOpened(true);
          }}>
          <BiSearch />
        </Button>
        {isModalOpened && <SearchModal setIsModalOpened={setIsModalOpened} />} 
        </>
      );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;