import { FC } from 'react';
import { Box, Pagination as PaginationMUI } from '@mui/material';

type PaginationProp = {
  totalCount: number;
  getPage: (page: number) => void;
};

const Pagination: FC<PaginationProp> = (props: PaginationProp) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 0 0' }}
    >
      <PaginationMUI
        count={props.totalCount}
        shape='rounded'
        color='primary'
        onChange={(e, p) => props.getPage(p)}
      />
    </Box>
  );
};

export default Pagination;
