import { Box, Paper,Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { formStyles } from '../../styles';
import { IUserScore } from '../../types';

type RateboardProps = {
  role: string;
  users: IUserScore[] ;
}

const Rateboard: React.FC<RateboardProps>  = ({ users, role }) => {
  return (
    <Box sx={{ justifyContent: 'center', display: 'flex' }} >
      <Box sx={formStyles}>
      { role === 'volunteer' ? (
        <Typography variant='h4' sx={{ textAlign: 'center' }} >
        Volunteers Rateboard
        </Typography>
      ) : (
        <Typography variant='h4' sx={{ textAlign: 'center' }} >
        Users Rateboard
        </Typography>
      )}
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='justify' sx={{ fontSize: '20px', fontWeight: 'bold' }}> Name </TableCell>
            { role === 'volunteer' ? (
            <TableCell align='right' sx={{ fontSize: '20px', fontWeight: 'bold' }}> Orders closed </TableCell>) : (
            <TableCell align='right' sx={{ fontSize: '20px', fontWeight: 'bold' }}> Donates </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.firstName}
            >
              <TableCell component='th' scope='row' >
              {user.firstName}
              </TableCell>
              <TableCell align='right'> {user.score} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
  );
}

export default Rateboard;
