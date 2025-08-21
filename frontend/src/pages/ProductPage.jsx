import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../api/api';

export default function ProductPage(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=> { products.get(id).then(r=>setP(r.data)).catch(()=>{}) }, [id]);
  if(!p) return <div>Loading...</div>;
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <img src={p.imageUrl || 'https://via.placeholder.com/600'} className="my-4"/>
      <p>{p.description}</p>
      <div className="mt-4">
        <strong>Price: ${p.price}</strong>
      </div>
    </div>
  );
}
