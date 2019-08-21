import * as React from 'react';
import { I18n } from 'react-i18nify';
import { MouseEventHandler } from 'react';

interface SaveCancelProps {
  id?: string;
  saveLabel?: string;
  saveDisabled?: boolean;
  onClickSave?: MouseEventHandler<any>;
  cancelLabel?: string;
  cancelDisabled?: boolean;
  onClickCancel?: MouseEventHandler<any>;
  translate?: Function;
}

const SaveCancel = (props: SaveCancelProps) => (
  <div className={'row'}>
    <div
      className="col-xs-6 col-sm-5 col-md-2 col-mdOffset-d"
      style={{ border: 'none', textAlign: 'center' }}
    >
      <button
        id={`Save_${props.id || 1}`}
        onClick={props.onClickSave}
        className="btn btn-outline-primary"
        type="button"
        disabled={props.saveDisabled}
      >
        {props.saveLabel || I18n.t('fullmakt.words.save')}
      </button>
    </div>
    <div
      className="col-xs-6 col-sm-5 col-md-2 "
      style={{ border: 'none', textAlign: 'center' }}
    >
      <button
        id={`Cancel_${props.id || 1}`}
        onClick={props.onClickCancel}
        className="btn btn-link"
        type="button"
        disabled={props.cancelDisabled}
      >
        {props.cancelLabel || I18n.t('fullmakt.words.cancel')}
      </button>
    </div>
  </div>
);

SaveCancel.displayName = 'SaveCancel';

export default SaveCancel;
