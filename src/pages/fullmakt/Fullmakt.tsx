import * as React from 'react';
import { memo } from 'react';
import { connect } from 'react-redux';
import {
  fetchInformationType,
  toggleEditView,
  toggleExpandRow,
  addBlankInformationType,
  deleteInformationType
} from './actions';
import { InformationTypeView, Result } from './types';
import { I18n } from 'react-i18nify';
import { Table, Column } from '../../components/table/Table';
import { get } from 'lodash';
import InformationTypeViewComponent from './InformationTypeViewComponent';
import InformationTypeSearchComponent from './InformationTypeSearchComponent';

interface PropsFromState {
  pathName?: string;
  data: Result;
}

interface PropsFromDispatch {
  fetchInformationType: typeof fetchInformationType;
  onToggleClick: typeof toggleExpandRow;
  toggleEditView: typeof toggleEditView;
  addBlankInformationType: typeof addBlankInformationType;
  isPending: boolean;
  deleteInformationType: typeof deleteInformationType;
}

type Props = PropsFromState & PropsFromDispatch;

class fullmakt extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchInformationType({});
  }

  public render() {
    const { data } = this.props;

    return (
      <div>
        <InformationTypeSearchComponent />
        <div className="row" style={{ marginLeft: '6px' }}>
          <Table
            data={(data && data.content) || []}
            idKey="informationTypeId"
            collapseComponent={CollapseComponent}
            onToggleClick={this.props.onToggleClick}
            isLoading={this.props.isPending}
            currentPage={this.props.data.currentPage}
            pageSize={this.props.data.pageSize}
            totalElements={this.props.data.totalElements}
            previousQuerySelector={(state: any) =>
              get(state, ['fullmakt', 'previousQuery'])
            }
            searchAction={(query: any) => fetchInformationType(query)}
            isEdit={true}
            onEditClick={this.props.toggleEditView}
            onAddClick={this.props.addBlankInformationType}
            onDeleteClick={this.props.deleteInformationType}
          >
            <Column
              width="15%"
              header={I18n.t('fullmakt.pages.mainPage.name')}
              path="name"
              sortable
            />
            <Column
              width="55%"
              header={I18n.t('fullmakt.pages.mainPage.description')}
              path="description"
              sortable
            />
            <Column
              width="15%"
              header={I18n.t('fullmakt.pages.mainPage.producer')}
              path="producer.code"
              contentTransformer={(val: any) => val}
              sortable
            />
            <Column
              width="15%"
              header={I18n.t('fullmakt.pages.mainPage.system')}
              path="system.code"
              contentTransformer={(val: any) => val}
              sortable
            />
          </Table>
        </div>
      </div>
    );
  }
}

const CollapseComponent = memo((props: InformationTypeView) => (
  <InformationTypeViewComponent {...props} />
));

export default connect(
  (state: any) => ({
    data: state.fullmakt.result,
    isPending: state.fullmakt.pending
  }),
  {
    fetchInformationType: fetchInformationType,
    onToggleClick: toggleExpandRow,
    toggleEditView,
    addBlankInformationType,
    deleteInformationType
  }
)(fullmakt);
