import { get } from 'lodash';
import { SORT_COLUMN, NEXT_PAGE, PREV_PAGE } from './sortingAndPagingActions';

export const sortingAndPagingMiddleware = (store: any) => (next: any) => (
  action: any
) => {
  if (action.type === SORT_COLUMN) {
    const previousQuery = action.previousQuerySelector(store.getState());
    let query;

    const sort = get(previousQuery, 'sort', '').split(',');
    if (action.column === sort[0]) {
      const dir = sort[1] === 'asc' ? 'desc' : 'asc';
      query = {
        ...previousQuery,
        sort: `${action.column},${dir}`
      };
    } else {
      query = {
        ...previousQuery,
        sort: `${action.column},asc`
      };
    }
    return store.dispatch(action.searchAction(query));
  }

  if (action.type === PREV_PAGE || action.type === NEXT_PAGE) {
    const previousQuery = action.previousQuerySelector(store.getState());
    const currentPage = get(previousQuery, 'page', 0);
    const pageSize = get(previousQuery, 'pageSize', 20);

    const query = {
      ...previousQuery,
      page: action.type === PREV_PAGE ? currentPage - 1 : currentPage + 1,
      pageSize: pageSize
    };

    return store.dispatch(action.searchAction(query));
  }
  return next(action);
};
