import HttpService from '../../services/HttpService';
import { ADD_BOOK, DELETE_BOOK, LIST_BOOKS } from '../constants/books.constant';

export const allBooks = (page = 0, limit = 10) => ({
  type: LIST_BOOKS,
  payload: {
    request: {
      url: `http://127.0.0.1:8000/items/?page=0&limit=1`,
    },
  },
});

export const addBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: {
      request: {
        url: '/demo/books',
        method: HttpService.HttpMethods.POST,
        data: book,
      },
    },
  };
};

export const deleteBook = (book) => {
  return {
    type: DELETE_BOOK,
    payload: {
      book,
      request: {
        url: `/demo/books/${book.id}`,
        method: HttpService.HttpMethods.DELETE,
      },
    },
  };
};
