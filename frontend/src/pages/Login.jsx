import React, { useState } from 'react';
import { auth } from '../api/api';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await auth.login({ email, password });
      alert('Logged in (token received). Save token to localStorage in real app.');
    }catch(err){
      alert('Login failed');
    }
  };
  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="w-full mb-2 p-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="w-full mb-2 p-2 border" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
    </form>
  );
}
