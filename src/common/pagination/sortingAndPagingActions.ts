export const NEXT_PAGE = 'common/next-page';
export const PREV_PAGE = 'common/prev-page';
export const SORT_COLUMN = 'common/sort-column';

export const getNextPage = (searchAction: any, previousQuerySelector: any) => ({
  type: NEXT_PAGE,
  searchAction,
  previousQuerySelector
});

export const getPrevPage = (searchAction: any, previousQuerySelector: any) => ({
  type: PREV_PAGE,
  searchAction,
  previousQuerySelector
});

export const sortColumn = (
  column: any,
  searchAction: any,
  previousQuerySelector: any
) => ({
  type: SORT_COLUMN,
  searchAction,
  previousQuerySelector,
  column
});
