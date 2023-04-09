import React, { useState, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Fade({ children }: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

export default Fade;