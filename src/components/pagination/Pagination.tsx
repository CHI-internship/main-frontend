import { FC } from 'react';
import { Box, Pagination as PaginationMUI } from '@mui/material';

type PaginationProp = {
  totalCount: number;
  getPage: (page: number) => void;
};

const Pagination: FC<PaginationProp> = (props: PaginationProp) => {
  return (
    <Box>
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
