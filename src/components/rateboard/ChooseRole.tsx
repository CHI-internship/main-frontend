import { Box,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

type RoleProps = {
  getRole: (role: string) => void;
};

const ChooseRole: React.FC<RoleProps> = ({ getRole }) => {
  const [value, setValue] = useState('user');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    getRole(event.target.value);
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
    <FormControl fullWidth>
     <InputLabel id='role'>Role</InputLabel>
      <Select
        labelId='role'
        id='role'
        value={value}
        label='Role'
        onChange={handleChange}
      >
      <MenuItem value={'user'}>User</MenuItem>
      <MenuItem value={'volunteer'}>Volunteer</MenuItem>
      </Select>
    </FormControl>
    </Box>
  );
};

export default ChooseRole;
