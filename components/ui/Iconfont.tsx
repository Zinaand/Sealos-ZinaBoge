// components/ui/Iconfont.tsx
import React from 'react';

interface IconfontProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  className?: string;
}

export const Iconfont = ({ name, className = '', ...props }: IconfontProps) => {
  return (
    <i 
      className={`iconfont ${name} ${className}`} 
      {...props}
    />
  );
};