import * as React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import * as ReactLoader from 'react-loader';

import { Paginator } from './paginator/Paginator';
import { sortColumn } from '../../common/pagination/sortingAndPagingActions';

import './Table.css';
import { I18n } from 'react-i18nify';

interface TableComponentProps {
  data: any;
  idKey: any;
  parentId?: number;
  collapseComponent?: any;
  onToggleClick: Function;
  isLoading: boolean;
  currentPage: any;
  pageSize: number;
  totalElements: number;
  onSortClick: Function;
  previousQuerySelector?: any;
  searchAction?: any;
  previousQuery?: any;
  children: any;
  className?: string;
  disabledPaginator?: boolean;
  isEdit?: boolean;
  onEditClick: Function;
  disabledEdit?: boolean;
  onAddClick: Function;
  onDeleteClick: Function;
}

const TableComponent = ({
  data,
  idKey,
  collapseComponent,
  onToggleClick,
  parentId,
  isLoading,
  currentPage,
  pageSize,
  totalElements,
  onSortClick,
  previousQuerySelector,
  searchAction,
  previousQuery,
  children,
  className,
  disabledPaginator,
  isEdit,
  onEditClick,
  disabledEdit,
  onAddClick,
  onDeleteClick
}: TableComponentProps) => {
  const tableBodyClassName = 'Table-body' + (isLoading ? ' is-loading' : '');

  return (
    <>
      {isLoading && <ReactLoader loaded={isLoading} />}
      <div className="Table">
        <div className="Table-row header-row">
          {renderHeaders(children, previousQuery, onSortClick, !!collapseComponent)}
          {isEdit && (
            <a
              href="#"
              className="Table-cell action-item mr-2"
              data-toggle="tooltip"
              style={{ marginRight: '100px' }}
              key="btn-add"
              onClick={e => {
                //alert(I18n.t('fullmakt.words.doNotHaveSufficientRole'));
                return parentId ? onAddClick(parentId) : onAddClick();
              }}
              title={
                1 !== 1
                  ? I18n.t('fullmakt.words.doNotHaveSufficientRole')
                  : I18n.t('fullmakt.words.add')
              }
              role="button"
            >
              <i className="fa fa-plus" style={{ fontSize: '18px' }} />
            </a>
          )}
          {!!collapseComponent && <div className="Row-toggle-header" />}
        </div>
        <div className={tableBodyClassName}>
          {renderRows(
            data,
            idKey,
            collapseComponent,
            onToggleClick,
            children,
            isLoading,
            onEditClick,
            onDeleteClick,
            parentId,
            disabledEdit
          )}
        </div>
      </div>
      {!disabledPaginator && (
        <Paginator
          currentPage={currentPage + 1}
          pageSize={pageSize}
          totalElements={totalElements}
          previousQuerySelector={previousQuerySelector}
          searchAction={searchAction}
        />
      )}
    </>
  );
};

interface ColumnProps {
  header: string;
  path: string;
  width: string;
  contentComponent?: any;
  contentTransformer?: Function;
  customSortPath?: any;
  keyId?: string;
  sortable?: boolean;
}

export const Column = ({
  header,
  path,
  width,
  contentComponent,
  contentTransformer,
  customSortPath,
  keyId
}: ColumnProps) => null;

const renderHeaders = (
  columns: any,
  previousQuery: any,
  onSortClick: Function,
  isCollapsible: boolean
) => (
  <>
    {columns.map((c: any) => {
      const style = { width: c.props.width ? c.props.width : '', marginRight: '10px' };
      if (c.props.sortable) {
        const previousSort = get(previousQuery, 'sort', ',').split(',');
        const sortPath = c.props.customSortPath ? c.props.customSortPath : c.props.path;
        const sortClass =
          'sort' + (sortPath === previousSort[0] ? ' ' + [previousSort[1]] : '');
        return (
          <div
            className="Table-header sortable"
            key={c.props.keyId || c.props.path}
            onKeyPress={() => onSortClick(sortPath)}
            onClick={() => onSortClick(sortPath)}
            style={style}
            tabIndex={0}
            role="button"
          >
            {c.props.header}
            <span className={sortClass} />
          </div>
        );
      } else {
        return (
          <div className="Table-header" key={c.props.keyId || c.props.path} style={style}>
            {c.props.header}
          </div>
        );
      }
    })}
  </>
);

const renderRows = (
  data: any,
  idKey: string,
  CollapseComponent: any,
  onToggleClick: Function,
  columns: any,
  isLoading: boolean,
  onEditClick: Function,
  onDeleteClick: Function,
  parentId?: number,
  disabledEdit?: boolean
) => {
  const isExpandable = !!CollapseComponent;
  const conditionalOnToggleClick = isExpandable
    ? (key: any) => {
        parentId ? onToggleClick(parentId, key) : onToggleClick(key);
      }
    : (key: any) => {};

  if (!isLoading && (!data || data.length === 0)) {
    return <div className="Table-row no-result center-content">Ingen resultater</div>;
  }

  return (
    data &&
    data.length > 0 &&
    data.map((d: any) => {
      const rowClassName = 'Table-row' + (isExpandable ? ' expandable' : '');
      return (
        <div key={d[idKey]}>
          <div
            style={d.isOpen && !parentId ? { backgroundColor: '#bae9f7' } : {}}
            className={rowClassName}
            id={d[idKey]}
            onKeyPress={() => conditionalOnToggleClick(d[idKey])}
            onClick={() => conditionalOnToggleClick(d[idKey])}
            tabIndex={isExpandable ? 0 : undefined}
            role="button"
          >
            {columns.map((c: any) => {
              const style = {
                width: c.props.width ? c.props.width : ''
              };
              return (
                <Cell
                  key={c.props.keyId || c.props.path}
                  style={style}
                  rowData={d}
                  columnProps={c.props}
                />
              );
            })}

            {isExpandable && (
              <div className="Table-cell Row-toggle" style={{ fontSize: '18px' }}>
                <i
                  className={
                    d.isOpen
                      ? 'Table-cell fa fa-angle-up action-item mr-4'
                      : 'Table-cell fa fa-angle-down action-item mr-4'
                  }
                />
                {!disabledEdit && d.isOpen && (
                  <a
                    href="#"
                    className="Table-cell action-item mr-2"
                    data-toggle="tooltip"
                    style={!d.isEdit ? {} : { color: 'grey' }}
                    key="btn-edit"
                    onClick={e => {
                      !d.isEdit && parentId
                        ? onEditClick(parentId, d[idKey])
                        : onEditClick(d[idKey]);
                      return e.stopPropagation();
                    }}
                    title={
                      1 !== 1
                        ? I18n.t('fullmakt.words.doNotHaveSufficientRole')
                        : I18n.t('fullmakt.words.edit')
                    }
                    role="button"
                  >
                    <i className="fa fa-pencil" />
                  </a>
                )}
                {d.isEdit && d.isOpen && d[idKey] !== -1 && (
                  <a
                    href="#"
                    className="Table-cell action-item mr-2"
                    data-toggle="tooltip"
                    key="btn-delete"
                    onClick={e => {
                      parentId
                        ? onDeleteClick(parentId, d[idKey])
                        : onDeleteClick(d[idKey]);
                      return e.stopPropagation();
                    }}
                    title={
                      1 !== 1
                        ? I18n.t('fullmakt.words.doNotHaveSufficientRole')
                        : I18n.t('fullmakt.words.delete')
                    }
                    role="button"
                  >
                    <i className="fa fa-trash" />
                  </a>
                )}
              </div>
            )}
          </div>

          {isExpandable && d.isOpen && (
            <div className="collapse-content">
              <CollapseComponent {...d} />
            </div>
          )}
        </div>
      );
    })
  );
};

interface CellProps {
  rowData: any;
  columnProps: any;
  style: any;
}

const Cell = ({ rowData, columnProps, style }: CellProps) => {
  const Content = columnProps.contentComponent;
  if (Content) {
    return (
      <div style={style} className="Table-cell">
        <Content rowData={rowData} {...columnProps.contentProps} />
      </div>
    );
  }

  const cellData = get(rowData, columnProps.path);
  const transformer = columnProps.contentTransformer;
  return (
    <div style={style} className="Table-cell">
      {transformer ? transformer(cellData) : cellData}
    </div>
  );
};

interface Prop {
  previousQuerySelector: Function;
  searchAction: Function;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  disabledPaginator?: boolean;
}

export const Table = connect(
  (state, ownProps: Prop) => ({
    previousQuery: ownProps.previousQuerySelector(state)
  }),
  (dispatch, ownProps) => ({
    onSortClick: (column: any) =>
      dispatch(sortColumn(column, ownProps.searchAction, ownProps.previousQuerySelector))
  })
)(TableComponent);
