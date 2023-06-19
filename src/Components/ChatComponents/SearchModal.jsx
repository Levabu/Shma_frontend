import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../lib/contexts/Auth/AuthContext";
import DisplayUsers from "../DisplayUsers/DisplayUsers";

export default function SearchModal({ setIsModalOpened }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { user, api } = useContext(AuthContext);

  const onInputChange = async (e) => {
    const newSearchValue = e.target.value;
    setSearchInput(newSearchValue);
    console.log(newSearchValue);
    try {
      const response = await api.getSearchIds(newSearchValue, user.id);
      if (response.status === 200) {
        setFilteredUsers(response.data.data);
      } else if (response.status === 400) {
        console.log(
          "No text to filter - users are only returned when something is searched."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container onClick={() => setIsModalOpened(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <input
          className="search-input"
          value={searchInput}
          onChange={onInputChange}
          placeholder="Search"
        ></input>
        {searchInput.length ? <DisplayUsers idsArr={false} allDetailsArr={filteredUsers} /> : ""}
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  background-color: #9a86f3;
  border-radius: 0.5rem;
  width: 90%;
  height: 80%;
  overflow-y: auto;
  box-shadow: 0 0 0.5rem #000000;
  .search-input {
    margin: auto;
    text-align: centre;
    width: 16rem;
    background-color: #ffffff54;
    border-radius: 2rem;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
  }
`;
