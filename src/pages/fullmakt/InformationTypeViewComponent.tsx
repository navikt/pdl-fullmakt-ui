import * as React from 'react';
import { InformationTypeView, PolicyResultDefaultValue } from './types';
import { I18n } from 'react-i18nify';
import PolicyViewComponent from './PolicyViewComponent';
import { toggleEditView, saveInformationType } from './actions';
import { connect } from 'react-redux';
import InformationTypeComponent from './InformationTypeComponent';
import { CodeListResult } from '../producers/types';

interface PropsFromDispatch {
  toggleEditView: typeof toggleEditView;
  saveInformationType: typeof saveInformationType;
}

interface PropsFromState {
  codeListResult: CodeListResult;
}

type Props = InformationTypeView & PropsFromDispatch & PropsFromState;

class InformationTypeViewComponent extends React.Component<Props> {
  public render() {
    return (
      <div
        style={{
          borderColor: 'blue',
          borderBlockWidth: '2px',
          borderStyle: 'solid'
        }}
      >
        <InformationTypeComponent
          {...this.props}
          codeListResult={this.props.codeListResult}
        />

        <div className="row" style={{ margin: '20px 10px 10px 10px' }}>
          <div className="col-12">
            <h5>{I18n.t('fullmakt.pages.mainPage.policies')}</h5>
          </div>
          <div className="col-md-8 col-sm-12" />
        </div>

        <PolicyViewComponent
          policy={this.props.policy || PolicyResultDefaultValue}
          isEdit={this.props.isEdit}
          informationTypeId={this.props.informationTypeId}
          codeListResult={this.props.codeListResult}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    codeListResult: state.codeList.result
  }),
  { toggleEditView: toggleEditView, saveInformationType }
)(InformationTypeViewComponent);
