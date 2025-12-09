'use client';

import { Card } from '@/components/ui/card';
import { Upload, Image, Zap, Globe } from 'lucide-react';

const stats = [
  {
    icon: Upload,
    label: 'Unlimited Free Image Uploads',
    value: '∞',
    description: 'No limits on free image hosting',
  },
  {
    icon: Globe,
    label: 'Global CDN Network',
    value: '275+',
    description: 'Worldwide fast image delivery',
  },
  {
    icon: Zap,
    label: 'Instant URL Generation',
    value: '<1s',
    description: 'Convert images to URLs instantly',
  },
  {
    icon: Image,
    label: 'Image Formats Supported',
    value: '5+',
    description: 'JPG, PNG, GIF, WEBP, SVG',
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
          <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-brand-orange">
            {stat.value}
          </div>
          <div className="font-medium text-sm text-foreground">{stat.label}</div>
          <div className="text-xs text-brand-blue-gray mt-1">{stat.description}</div>
        </Card>
      ))}
    </div>
  );
}