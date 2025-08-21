import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;
export default function ChatWidget({ userId }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_SOCKET || 'http://localhost:4000');
    socket.emit('joinRoom', `user_${userId}`);
    socket.on('chatMessage', m => setMsgs(prev => [...prev, m]));
    return () => socket.disconnect();
  }, [userId]);

  function send(){
    socket.emit('chatMessage', { roomId: `user_${userId}`, message: text, from: userId });
    setText('');
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border p-3 rounded shadow">
      <div className="h-40 overflow-auto">{msgs.map((m,i)=>(<div key={i}>{m.message}</div>))}</div>
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 border p-1 rounded" />
        <button onClick={send} className="px-3 py-1 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
