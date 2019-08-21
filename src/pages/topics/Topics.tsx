import * as React from 'react';
import { I18n } from 'react-i18nify';

class Topics extends React.Component {
  public render() {
    return (
      <div>
        <h5>{I18n.t('fullmakt.pages.topics.topics')}</h5>
        <hr style={{ height: '1px' }} />
        <div>{I18n.t('fullmakt.words.pageDetails')}</div>
      </div>
    );
  }
}

export default Topics;
