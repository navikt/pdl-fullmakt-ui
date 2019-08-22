import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface INavigasjonKnappProps {
    to: string;
    children: React.ReactNode;
}

type Props = INavigasjonKnappProps;

const Navigasjonknapp: React.StatelessComponent<Props> = ({ to, children }) => {
    return (
        <Link to={to}>
            <KnappBase type="hoved">{children}</KnappBase>
        </Link>
    );
};

export default Navigasjonknapp;
