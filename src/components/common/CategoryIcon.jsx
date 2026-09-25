import React from 'react';
import * as Icons from 'lucide-react';

export const CategoryIcon = ({ iconName, className = "w-5 h-5", color }) => {
  const IconComponent = Icons[iconName] || Icons.Tag;
  return <IconComponent className={className} style={color ? { color } : undefined} />;
};

export const AVAILABLE_ICONS = [
  'Utensils',
  'Bus',
  'BookOpen',
  'ShoppingBag',
  'Film',
  'HeartPulse',
  'Receipt',
  'MoreHorizontal',
  'Tag',
  'Coffee',
  'Laptop',
  'Smartphone',
  'Music',
  'Zap',
  'Home',
  'Gift',
  'Car',
  'Smile',
  'CreditCard',
  'ShieldAlert'
];
