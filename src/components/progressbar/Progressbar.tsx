import { Box, Container } from '@mui/material';
import { Line } from 'rc-progress';

export default function ProgressBar() {

  return (
    <Container>
      <Box sx={{
        width: 500,
        marginTop: 10,
        ml: 15,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <Box component='div' sx={{
            display: 'inline',
            fontSize: 'h5.fontSize'
          }}>
            300.000 Зібрано
          </Box>
          <Box component='div' sx={{
            display: 'inline',
            fontSize: 'h6.fontSize',
            marginLeft: 'auto'
          }}>
            100% суми
          </Box>
        </Box>
        <Line
          percent={10}
          strokeWidth={4}
          trailWidth={4}
          trailColor='#fcd700'
          strokeColor='#005aa9' />
        <Box>
          Залишилось 5 днів
        </Box>
      </Box>
    </Container>
  );
}
