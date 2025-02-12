import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="relative group cursor-pointer">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{category.name}</h3>
      </div>
    </div>
  );
}