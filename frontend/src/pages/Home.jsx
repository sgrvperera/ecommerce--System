import React, { useEffect, useState } from 'react';
import { products } from '../api/api';
import ProductCard from '../components/ProductCard';

export default function Home(){
  const [items, setItems] = useState([]);
  useEffect(()=> { products.list().then(r=>setItems(r.data)).catch(()=>{}) }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p=> <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
