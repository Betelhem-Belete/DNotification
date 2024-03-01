import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

function Message() {
  const token = localStorage.getItem('access_token');
  const { access_token } = JSON.parse(token);
  const socket = io('http://localhost:3000/', {
    extraHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);


  socket.on('message', (message) => {
   setMessages((prevMessages) => [...prevMessages, message]);
 });

  const handleUserClick = async (user) => {

    setSelectedUser(user);
    // try {
    //   const tokens = JSON.parse(localStorage.getItem('access_token'));
    //   const response = await axios.post('http://localhost:3000/chat', {
    //     sender: tokens.id,
    //     receiver: user.id,
    //   });
    //   const c_id = response.data.id;
    //   socket.emit('joinRoom', c_id);
    //   setRoomId(c_id);
    // } catch (error) {
    //   console.error('Error creating chat room:', error);
    // }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/', {
        params: {
          query: searchQuery,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendMessage = () => {
    console.log(selectedUser.id)
    socket.emit('sendMessage', { userId: selectedUser.id, message });
    // setMessage('');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Left Side - User List and Search */}
          <div className="card">
            <div className="card-header">Users</div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <ul className="list-group">
                {users.map((user, index) => (
                  <li
                    className="list-group-item"
                    key={index}
                    onClick={() => handleUserClick(user)}
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
              {selectedUser === null && <p>Select a user</p>}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* Right Side - Chat Box */}
          <div className="card">
            <div className="card-header">Chat</div>
            <div
              className="card-body chat-box"
              style={{ maxHeight: '60vh', overflowY: 'auto' }}
            >
              {/* Display messages */}
              {messages.map((msg, index) => (
                <div className="message" key={index}>
                  <p>{msg}</p>
                </div>
              ))}
            </div>
            {/* Input field for sending messages */}
            {selectedUser && (
              <div className="card-footer">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-label="Type your message"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
