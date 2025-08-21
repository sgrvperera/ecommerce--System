import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }){
  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.title} className="h-40 w-full object-cover rounded" />
      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="font-bold">${product.price}</span>
        <Link to={`/product/${product._id}`} className="text-blue-600">View</Link>
      </div>
    </div>
  );
}
