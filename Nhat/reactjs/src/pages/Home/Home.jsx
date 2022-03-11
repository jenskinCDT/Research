import { Box, Button } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';

function Home() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box padding={5} marginTop={5}>
      <LocalizationProvider dateAdapter={DateAdapter}>
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
      </LocalizationProvider>
    </Box>
  );
}

export default Home;
