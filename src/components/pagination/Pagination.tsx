import { FC } from 'react';
import { Box, Pagination as PaginationMUI } from '@mui/material';

type PaginationProps = {
  totalCount: number;
  getPage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ totalCount, getPage }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 0 0' }}
    >
      <PaginationMUI
        count={totalCount}
        shape='rounded'
        color='primary'
        onChange={(e, p) => getPage(p)}
      />
    </Box>
  );
};

export default Pagination;
