import { Box, Button } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CustomTable from '../../components/CustomTable/CustomTable';
import UserService from '../../services/UserService';
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
function Home() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box padding={5} marginTop={5}>
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
                reject(err);
                console.log(err);
                toast.error('Đã có lỗi xảy ra');
              });
          })
        }
      />
      {/* <LocalizationProvider dateAdapter={DateAdapter}>
        <Box display={'flex'} marginBottom={2}>
          <DateTimePicker
            label="From Date"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <Box sx={{ ml: 2 }}>
            <DateTimePicker
              label="To Date"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </Box>
          <Button color="primary" variant="contained" sx={{ ml: 2 }}>
            Search
          </Button>
        </Box>
      </LocalizationProvider> */}
    </Box>
  );
}

export default Home;
