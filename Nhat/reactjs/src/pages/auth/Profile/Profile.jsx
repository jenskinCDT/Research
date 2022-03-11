import moment from 'moment';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { allBooks } from '../../../redux/actions/books.action';
import CustomTable from '../../../components/CustomTable/CustomTable';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify';

const columns = [
  { title: 'ID', field: 'id' },
  { title: 'Title', field: 'title' },
  { title: 'Name', field: 'name' },
  {
    title: 'Overview',
    field: 'overview',
    cellStyle: {
      wordBreak: 'break-word',
      maxWidth: 500,
      minWidth: 500,
    },
  },
  { title: 'Runtime', field: 'runtime' },
  {
    title: 'CreatedAt',
    field: 'createdAt',
    render: (rowData) => moment(rowData.createdAt).format('DD/MM/yyyy HH:mm:ss'),
  },

  {
    title: 'ReleasedAt',
    field: 'releasedAt',
    render: (rowData) => moment(rowData.releasedAt).format('DD/MM/yyyy HH:mm:ss'),
  },
  { title: 'Status', field: 'status' },
];

function Profile() {
  return (
    <div>
      <CustomTable
        title={'Posts'}
        columns={columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            console.log(query);
            let url = 'http://10.1.38.58:8000/items/?';
            url += 'limit=' + query.pageSize;
            url += '&page=' + (query.page + 1);
            fetch(url, { headers: { Authorization: `Bearer ${UserService.getToken()}` } })
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.totalCount || 0,
                });
              })
              .catch((err) => {
                console.log(err);
                toast.error('Đã có lỗi xảy ra');
              });
          })
        }
      />
    </div>
  );
}

export default Profile;
