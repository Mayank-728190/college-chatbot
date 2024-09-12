import React, { useEffect, useState } from 'react';

const Chats = () => {
  const [chats, setChats] = useState([]);

  // Example of handling browser-specific logic, if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Your browser-specific code here
    }
  }, []);

  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index}>{chat}</div>
      ))}
    </div>
  );
};

export default Chats;
