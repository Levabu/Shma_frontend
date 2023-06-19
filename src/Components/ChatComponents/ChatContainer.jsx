import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Robot from '../../assets/robot.gif';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';
import { WsContext } from '../../lib/contexts/Ws/WsContext';
import FriendRequests from './FriendRequestsButton';
import MyProfile from './MyProfile';
import SearchButton from './SearchButton';

export default function ChatContainer({ currentChat, socket, selectedTab, messages, setMessages}) {
  
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);
  const { setChatsHistory, chatsHistory } = useContext(WsContext);

  const convertDate = (date) => {
    return new Date(date).toDateString();
  }

  const handleSendMsg = async (message) => {
    
    socket.emit('chat_message', {
      to: currentChat.id,
      from: user.id,
      type: selectedTab === 'friends' ? 'private' : 'group',
      message,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message, createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ') });
    setMessages(msgs);

    setChatsHistory((prev) => {
      const history = { ...prev };

      let chat = currentChat.id;
      const type = selectedTab === 'friends' ? 'private' : 'group';

      if (!history[type][chat]) {
        history[type][chat] = [];
      }
      history[type][chat].push({
        fromSelf: true,
        message,
        type,
        ...(type === 'group' && { from: currentChat.id }),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      });

      return history;
    });
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [messages]);
  
  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={Robot} alt='' />
          </div>
          <div className='username'>
            <h3>{currentChat.username || currentChat.name}</h3>
          </div>
        </div>
        <div className="buttons">
          <MyProfile />
          <SearchButton />
          <FriendRequests />
          <Logout />
        </div>
      </div>
      <div className='chat-messages'>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className='content '>
                <span className='display-user'>{ !message.fromSelf ? (currentChat.username || message.userName )  
                  : user.userName}</span> 
                  <span className='display-date'>{convertDate(message.createdAt)}</span>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  height: 90vh;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 65% 20%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .buttons {
      display: flex;
      gap: 1rem;
    }
  }
  .chat-messages {
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow: auto;
    z-index: 1;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        min-width: 10%;
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0 1rem;
        padding-bottom: 1rem;
        margin: 0;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        position: relative;
        background-color: #31a377;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        position: relative;
        background-color: #722994;
      }
    }
    .display-user {
      display: block;
      position: relative;
      color: pink;
      top: -1rem;
    }

    .display-date {
      font-size: 0.7rem;
      position: relative;
      top: -1.5rem;
    }
  }

  p {
    margin: 0;
  }
`;
