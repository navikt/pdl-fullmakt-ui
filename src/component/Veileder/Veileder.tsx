import Veilederpanel from 'nav-frontend-veilederpanel';
import * as React from 'react';
import Veilederikon from '../../component/Ikoner/Veilederikon';

interface IVeilederProps {
    className?: string;
    content: React.ReactNode;
}

type VeilederProps = IVeilederProps;

const Veileder: React.StatelessComponent<VeilederProps> = ({ content, className }) => {
    return (
        <div className={className}>
            <Veilederpanel
                svg={<Veilederikon morkBakgrunn={true} />}
                type="normal"
                kompakt={true}
                veilederProps={{ children: <div />, center: true }}
            >
                {content}
            </Veilederpanel>
        </div>
    );
};

export default Veileder;
