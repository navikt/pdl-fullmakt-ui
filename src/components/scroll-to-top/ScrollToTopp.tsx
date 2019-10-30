import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ScrollToTop = ({ children }: Props) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</> || null;
};

export default ScrollToTop;
