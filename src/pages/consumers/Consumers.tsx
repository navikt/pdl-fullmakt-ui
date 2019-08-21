import * as React from 'react';
import { I18n } from 'react-i18nify';

class Consumers extends React.Component {
  public render() {
    return (
      <div>
        <h5>{I18n.t('fullmakt.pages.consumers.consumers')}</h5>
        <hr style={{ height: '1px' }} />
        <table className="table table-striped table-responsive-sm">
          <thead>
            <tr>
              <th>{I18n.t('fullmakt.pages.mainPage.itSystemOrConsumer')}</th>
              <th>{I18n.t('fullmakt.pages.mainPage.typeOfIntegration')}</th>
              <th>{I18n.t('fullmakt.pages.mainPage.purpose')}</th>
            </tr>
          </thead>
          <tbody>
            <tr key={1}>
              <td>Pesys</td>
              <td>Sivilstand</td>
              <td>AP, UP, BP, OP</td>
            </tr>
            <tr key={2}>
              <td>Pesys</td>
              <td>Fnr.</td>
              <td>AP, UP, BP, OP</td>
            </tr>
            <tr key={3}>
              <td>Pesys</td>
              <td>Navn</td>
              <td>AP, UP, BP, OP</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Consumers;
