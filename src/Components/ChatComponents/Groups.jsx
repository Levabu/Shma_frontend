import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/itc.png';
import StarLogo from '../../assets/davidstar.png';
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';
import { WsContext } from '../../lib/contexts/Ws/WsContext';

export default function Groups({ groups, changeChat,  setMessages, chatsHistory }) {
  const { user } = useContext(AuthContext);
  const [currentUserImage, setCurrentUserImage] = useState(Logo);
  const [currentGroupSelected, setCurrentGroupSelected] =  useState(groups[0]);
  const { isChatHistoryLoaded } = useContext(WsContext);

  const changeCurrentChat = (index, group) => {
    setCurrentGroupSelected(index);
    changeChat(group);
    if (chatsHistory.group[group.id] === undefined) {
      setMessages([]);
    } else {
      setMessages(chatsHistory.group[group.id]);
    }
    
  };
 
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className='brand'>
            <img src={StarLogo} alt='logo' />
            <h3>Welcome to Shma</h3>
          </div>
          <div className='contacts'>
            {isChatHistoryLoaded && <>
              {groups.map((group, index) => {
                return (
                  <div
                    key={group.id}
                    className={`contact ${
                      index === currentGroupSelected ? 'selected' : ''
                    }`}
                    onClick={() => changeCurrentChat(index, group)}
                  >
                    <div className='avatar'>
                      <img src={Logo} alt='' />
                    </div>
                    <div className='username'>
                      <h3>{group.name}</h3>
                    </div>
                  </div>
                );
              })}
            </>}
          </div>
          <div className='current-user'>
            <div className='username'>
              <h2>{user.userName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  height: 85vh;
  justify-self: stretch;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    margin-bottom: 1rem;
    justify-content: center;
    img {
      height: 1.5rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: stretch;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0 2px;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 2rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    ${'' /* @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      
    } */}
  }
`;
