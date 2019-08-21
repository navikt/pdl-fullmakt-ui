import * as React from 'react';
import { Policy, PolicyResult } from './types';
import { I18n } from 'react-i18nify';
import { Column, Table } from '../../components/table/Table';
import {
  fetchPolicyForInformationType,
  toggleExpandRowPolicy,
  toggleEditView,
  addBlankPolicy,
  savePolicy,
  deletePolicy
} from './actions';
import { memo } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PolicyComponent from './PolicyComponent';
import { CodeListResult } from '../producers/types';

interface PropsFromComponent {
  pathName?: string;
  policy: PolicyResult;
  isEdit?: boolean;
  informationTypeId: number;
  codeListResult: CodeListResult;
}

interface PropsFromDispatch {
  fetchPolicyForInformationType: typeof fetchPolicyForInformationType;
  onToggleClick: typeof toggleExpandRowPolicy;
  toggleEditView: typeof toggleEditView;
  addBlankPolicy: typeof addBlankPolicy;
  savePolicy: typeof savePolicy;
  deletePolicy: typeof deletePolicy;
}

type Props = PropsFromComponent & PropsFromDispatch;

class PolicyViewComponent extends React.Component<Props> {
  public componentDidMount() {
    this.props.informationTypeId &&
      this.props.informationTypeId > 0 &&
      this.props.fetchPolicyForInformationType({}, this.props.informationTypeId);
  }

  public render() {
    const addExtraProps = (
      content: Policy[],
      codeListResult: CodeListResult,
      informationTypeId: number,
      toggleEditView: Function,
      savePolicy: Function
    ) =>
      content && content.length >= 0
        ? content.map((c: Policy) => {
            return {
              ...c,
              codeListResult,
              informationTypeId,
              toggleEditView,
              savePolicy
            };
          })
        : [];
    return (
      <div className="row" style={{ marginLeft: '6px', marginRight: '6px' }}>
        <Table
          data={addExtraProps(
            get(this.props, ['policy', 'result', 'content']) || [],
            this.props.codeListResult,
            this.props.informationTypeId,
            this.props.toggleEditView,
            this.props.savePolicy
          )}
          idKey="policyId"
          parentId={this.props.informationTypeId}
          collapseComponent={CollapseComponent}
          onToggleClick={this.props.onToggleClick}
          isLoading={this.props.policy.pending}
          currentPage={get(this.props, ['policy', 'result', 'currentPage'])}
          pageSize={get(this.props, ['policy', 'result', 'pageSize'])}
          totalElements={get(this.props, ['policy', 'result', 'totalElements'])}
          previousQuerySelector={(state: any) =>
            get(this.props, ['policy', 'previousQuery'])
          }
          searchAction={(query: any) =>
            fetchPolicyForInformationType(query, this.props.informationTypeId)
          }
          isEdit={true}
          onEditClick={this.props.toggleEditView}
          onAddClick={this.props.addBlankPolicy}
          onDeleteClick={this.props.deletePolicy}
        >
          <Column
            width="50%"
            header={I18n.t('fullmakt.pages.mainPage.purposeCode')}
            path="purpose.code"
            sortable
          />
          <Column
            width="50%"
            header={I18n.t('fullmakt.pages.mainPage.legalBasis')}
            path="legalBasisDescription"
            contentTransformer={(val: any) => val}
            sortable
          />
        </Table>
      </div>
    );
  }
}

const CollapseComponent = memo(
  (
    props: Policy & {
      codeListResult: CodeListResult;
      informationTypeId: number;
      toggleEditView: Function;
      savePolicy: Function;
    }
  ) => (
    <PolicyComponent
      {...props}
      codeListResult={props.codeListResult}
      informationTypeId={props.informationTypeId}
      toggleEditView={props.toggleEditView}
      savePolicy={props.savePolicy}
    />
  )
);

export default connect(
  null,
  {
    fetchPolicyForInformationType,
    onToggleClick: toggleExpandRowPolicy,
    toggleEditView: toggleEditView,
    addBlankPolicy: addBlankPolicy,
    savePolicy: savePolicy,
    deletePolicy
  }
)(PolicyViewComponent);
