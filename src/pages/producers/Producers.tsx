import * as React from 'react';
import { I18n } from 'react-i18nify';
import { connect } from 'react-redux';
import { CodeListResult, CodeListView } from './types';

const getSpinner = () => (
  <div>
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-info" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-light" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-dark" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

type Props = {
  codeListResult?: CodeListResult;
  isPending: boolean;
};
class Producers extends React.Component<Props> {
  public render() {
    const getTable = (
      data: CodeListView[] | null | undefined,
      isPending: boolean,
      label: string
    ) => {
      return (
        <div style={{ marginBottom: '100px' }}>
          <h5>{I18n.t(label)}</h5>
          <hr style={{ height: '1px' }} />
          <div className="table-responsive">
            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th>{I18n.t('fullmakt.pages.mainPage.code')}</th>
                  <th>{I18n.t('fullmakt.pages.mainPage.description')}</th>
                </tr>
              </thead>
              <tbody>
                {!isPending
                  ? data &&
                    data.map(p => (
                      <tr key={p.code}>
                        <td>{p.code}</td>
                        <td>{p.description}</td>
                      </tr>
                    ))
                  : getSpinner()}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    return (
      <div>
        {getTable(
          this.props && this.props.codeListResult && this.props.codeListResult.producer,
          this.props.isPending,
          'fullmakt.pages.mainPage.producer'
        )}
        {getTable(
          this.props && this.props.codeListResult && this.props.codeListResult.category,
          this.props.isPending,
          'fullmakt.pages.mainPage.category'
        )}
        {getTable(
          this.props && this.props.codeListResult && this.props.codeListResult.system,
          this.props.isPending,
          'fullmakt.pages.mainPage.system'
        )}
        {getTable(
          this.props && this.props.codeListResult && this.props.codeListResult.purpose,
          this.props.isPending,
          'fullmakt.pages.mainPage.purpose'
        )}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    codeListResult: state.codeList.result,
    isPending: state.codeList.pending
  }),
  null
)(Producers);
