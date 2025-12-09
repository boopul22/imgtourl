'use client';

import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  className = '' 
}: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === activeCategory ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={
            category === activeCategory 
              ? 'bg-brand-orange hover:bg-brand-orange/90 text-white' 
              : 'hover:bg-brand-orange/10 hover:text-brand-orange border-brand-orange/20'
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
