import * as React from 'react';
import Navigasjonknapp from '../../component/Navigasjonknapp/Navigasjonknapp';

const SidenFinnesIkke = () => {
    return (
        <div>
            <h1>Ooops</h1>
            <p>Siden du prøver å nå finnes ikke</p>

            <Navigasjonknapp to="/">Tilbake til hovedsiden</Navigasjonknapp>
        </div>
    );
};

export default SidenFinnesIkke;
