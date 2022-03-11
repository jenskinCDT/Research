import axios from 'axios';
import { toast } from 'react-toastify';
import UserService from './UserService';

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const _axios = axios.create();

const configure = () => {
  _axios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return Promise.resolve(config);
      };
      return UserService.updateToken(cb);
    }
  });
  _axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response) {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        toast.error('Token không hợp lệ');
        setTimeout(() => {
          UserService.doLogout();
        }, 500);
      }
      if (error.response.status === 404) {
        toast.error('API không tồn tại');
      }
      return Promise.reject(error);
    }
  );
};

const getAxiosClient = () => _axios;

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
};

export default HttpService;
