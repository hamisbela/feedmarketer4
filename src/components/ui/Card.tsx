import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hasHover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hasHover = false,
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${hasHover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;