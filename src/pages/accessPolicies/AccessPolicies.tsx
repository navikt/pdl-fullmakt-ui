import * as React from 'react';
import { I18n } from 'react-i18nify';
import { connect } from 'react-redux';
import { Policy, PolicyResult } from './types';
import { fetchPolicy } from './actions';

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
  policyResult?: PolicyResult;
  isPending: boolean;
  fetchPolicy: typeof fetchPolicy;
};
class accessPolicies extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchPolicy();
  }

  public render() {
    const getTable = (data: Policy[] | undefined, isPending: boolean, label: string) => {
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
                  <th>{I18n.t('fullmakt.pages.mainPage.legalBasis')}</th>
                  <th>{I18n.t('fullmakt.pages.mainPage.purposeCode')}</th>
                  <th>{I18n.t('fullmakt.pages.mainPage.purposeDescription')}</th>
                </tr>
              </thead>
              <tbody>
                {!isPending
                  ? data &&
                    data.map(p => (
                      <tr key={p.policyId}>
                        <td>{p.informationType && p.informationType.name}</td>
                        <td>{p.informationType && p.informationType.description}</td>
                        <td>{p.legalBasisDescription}</td>
                        <td>{p.purpose && p.purpose.code}</td>
                        <td>{p.purpose && p.purpose.description}</td>
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
          this.props && this.props.policyResult && this.props.policyResult.content,
          this.props.isPending,
          'fullmakt.pages.accessPolicies.accessPolicies'
        )}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    policyResult: state.policy.result,
    isPending: state.policy.pending
  }),
  { fetchPolicy }
)(accessPolicies);
