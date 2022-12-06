import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useState } from 'react';

type StatusFilterProps = {
  getStatusFilter: (status: string) => void;
};

const StatusFilter: FC<StatusFilterProps> = ({ getStatusFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleStatusFilter = (e: SelectChangeEvent) => {
    setSelectedFilter(e.target.value);
    getStatusFilter(e.target.value);
  };

  return (
    <>
      <Select
        label='Status'
        value={selectedFilter}
        onChange={handleStatusFilter}
        sx={{
          minWidth: '120px',
        }}
      >
        <MenuItem value={'all'}>All</MenuItem>
        <MenuItem value={'open'}>Open</MenuItem>
        <MenuItem value={'closed'}>Closed</MenuItem>
      </Select>
    </>
  );
};

export default StatusFilter;
