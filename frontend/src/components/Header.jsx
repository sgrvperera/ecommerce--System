import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">E-Shop</Link>
        <nav className="space-x-4">
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
