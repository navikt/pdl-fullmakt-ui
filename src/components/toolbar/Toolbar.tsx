import * as React from 'react';
import { I18n } from 'react-i18nify';
import { MouseEventHandler } from 'react';

type Props = {
  saveOnClick?: MouseEventHandler;
  saveDisabled?: boolean;
  cancelOnClick?: MouseEventHandler;
  cancelDisabled?: boolean;
};
const Toolbar = ({ saveOnClick, saveDisabled, cancelOnClick, cancelDisabled }: Props) => {
  return (
    <div className="row">
      <div className="col-md-10" />
      <div style={{ margin: 20, float: 'right' }}>
        <button
          key="btn-cancel"
          className="btn btn-link"
          style={{ marginRight: 40 }}
          onClick={cancelOnClick}
          disabled={cancelDisabled}
        >
          {I18n.t('fullmakt.words.cancel')}
        </button>
        <button
          key="btn-save"
          className="btn btn-outline-primary"
          disabled={saveDisabled}
          onClick={saveOnClick}
        >
          {I18n.t('fullmakt.words.save')}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
