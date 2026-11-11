import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  width?: 'flagship' | 'content' | 'editorial' | 'narrow';
  className?: string;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  width = 'content',
  className = '',
  as: Component = 'div',
}) => {
  const widthClasses = {
    flagship: 'max-w-[1440px]',
    content: 'max-w-[1200px]',
    editorial: 'max-w-[880px]',
    narrow: 'max-w-[640px]',
  };

  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${widthClasses[width]} ${className}`}
    >
      {children}
    </Component>
  );
};
