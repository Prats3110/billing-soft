'use client';
import { useState } from 'react';
//import RoleGuard from '@/components/RoleGuard';

export default function BillingPage() {
  const [items, setItems] = useState([{ name: '', price: 0, qty: 1 }]);

  const addItem = () => setItems([...items, { name: '', price: 0, qty: 1 }]);

  return (
    // <RoleGuard role="cashier">
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">New Billing Entry</h1>
        
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input placeholder="Item" className="border p-2 w-full" />
            <input type="number" placeholder="Price" className="border p-2 w-20" />
            <input type="number" placeholder="Qty" className="border p-2 w-16" />
          </div>
        ))}
        
        <button onClick={addItem} className="bg-gray-200 p-2 rounded w-full mb-4">
          + Add Item
        </button>
        
        <button className="bg-blue-600 text-white p-3 rounded w-full font-bold">
          Generate Invoice (QR Code)
        </button>
      </div>
    // </RoleGuard>
  );
}