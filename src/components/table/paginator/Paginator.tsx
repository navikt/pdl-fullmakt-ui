import * as React from 'react';
import { connect } from 'react-redux';
import { ceil } from 'lodash';

import {
  getNextPage,
  getPrevPage
} from '../../../common/pagination/sortingAndPagingActions';

import './Paginator.css';
import { MouseEventHandler } from 'react';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';

const PaginatorComponent = ({
  currentPage,
  pageSize,
  totalElements,
  onPageLeftClick,
  onPageRightClick
}: PaginatorProps) => {
  const numberOfPages = ceil(totalElements / pageSize);
  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalElements);
  const endItem = Math.min(currentPage * pageSize, totalElements);

  const leftButtonDisabled = currentPage <= 1;
  const rightButtonDisabled = currentPage >= numberOfPages;

  return (
    <div className="Paginator">
      <span style={{ wordSpacing: '.2rem' }}>
        viser {startItem || 0} til {endItem || 0} av totalt {totalElements || 0}
      </span>
      <PagingButton
        direction={DIRECTION_LEFT}
        onClick={onPageLeftClick}
        disabled={leftButtonDisabled}
      />
      <PagingButton
        direction={DIRECTION_RIGHT}
        onClick={onPageRightClick}
        disabled={rightButtonDisabled}
      />
    </div>
  );
};

interface PaginatorProps {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  onPageLeftClick?: MouseEventHandler<any>;
  onPageRightClick?: MouseEventHandler<any>;
  previousQuerySelector?: MouseEventHandler<any>;
  searchAction?: MouseEventHandler<any>;
}

const PagingButton = ({ direction, onClick, disabled }: PagingButtonProps) => {
  const ariaLabel = direction === DIRECTION_LEFT ? 'Get previous page' : 'Get next page';
  const className = 'PagingButton' + (disabled ? ' disabled' : '');

  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      <i
        className={
          direction === DIRECTION_LEFT ? 'fa fa-angle-left' : 'fa fa-angle-right'
        }
      />
    </button>
  );
};

interface PagingButtonProps {
  direction: string;
  onClick?: MouseEventHandler<any>;
  disabled: boolean;
}

export const Paginator = connect(
  null,
  (dispatch, ownProps: PaginatorProps) => ({
    onPageLeftClick: () =>
      dispatch(getPrevPage(ownProps.searchAction, ownProps.previousQuerySelector)),
    onPageRightClick: () =>
      dispatch(getNextPage(ownProps.searchAction, ownProps.previousQuerySelector))
  })
)(PaginatorComponent);
