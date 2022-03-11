import { DELETE_BOOK, LIST_BOOKS } from '../constants/books.constant';
import { SUCCESS_SUFFIX, ERROR_SUFFIX } from 'redux-axios-middleware';

const initialize = {
  data: [],
  page: 0,
  totalRow: 0,
};
const booksReducer = (state = initialize, action) => {
  switch (action.type) {
    case LIST_BOOKS + SUCCESS_SUFFIX:
      const { data, page, totalRow } = action.payload.data;
      return { ...state, data: data, page: page, totalRow: totalRow };
    case LIST_BOOKS + ERROR_SUFFIX:
      return state;
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload.book.id);

    default:
      return state;
  }
};

export default booksReducer;
