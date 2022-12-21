import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC, useState } from 'react';

type SortProps = {
  getSortValue: (sortValue: string) => void;
};

const SortOrders: FC<SortProps> = ({ getSortValue }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    getSortValue(event.target.value);
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        width: 150,
        height: 50,
        marginLeft: 3,
        display: 'flex',
      }}
    >
      <FormControl size='small' fullWidth>
        <InputLabel id='select-label'> Sort by </InputLabel>
        <Select
          labelId='select-label'
          id='select'
          value={value}
          label='Sort by'
          onChange={handleChange}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'popularity'}>Popularity</MenuItem>
          <MenuItem value={'remain'}>Remaining time</MenuItem>
          <MenuItem value={'date'}>Creation date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortOrders;
