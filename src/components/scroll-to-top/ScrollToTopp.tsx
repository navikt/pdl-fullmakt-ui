import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
  children: JSX.Element | JSX.Element[];
}

type MergedProps = Props & RouteComponentProps;
const ScrollToTop = ({ location, children }: MergedProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</> || null;
};

export default withRouter(ScrollToTop);
