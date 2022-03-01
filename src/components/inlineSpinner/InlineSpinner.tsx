import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';

import './InlineSpinner.less';

interface InlineSpinnerProps {
  text: string;
}

function InlineSpinner(props: InlineSpinnerProps) {
  return (
    <div className='InlineSpinner'>
      <NavFrontendSpinner transparent={true} />
      <Normaltekst className='InlineSpinner__text'>{props.text}</Normaltekst>
    </div>
  );
}

export default InlineSpinner;
