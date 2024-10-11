import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <div className={`container mx-auto p-4 ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
