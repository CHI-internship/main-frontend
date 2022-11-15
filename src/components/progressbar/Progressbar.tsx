import { Box, Container } from '@mui/material';
import { Line } from 'rc-progress';
import { FC, useEffect, useState } from 'react';

interface IProgressBarProps {
  moneyHave: number
  moneyNeed: number
  closedAt: Date
}

function calculatePercent (moneyHave: number, moneyNeed: number) {
  if (!moneyNeed) return 0;

  const percent = (moneyHave * 100)/moneyNeed;
  return percent;
}

function calculateDays (date: Date) {
  if (!date.getTime()) return 0;
  const time = date.getTime() - new Date().getTime();
  if (time < 0) return 0;
  const daysLeft = Math.floor(time / (1000 * 60 * 60 * 24));
  return daysLeft;
}

function calculateHours (date: Date) {
  if (!date.getTime()) return 0;
  const time = date.getTime() - new Date().getTime();
  if (time < 0) return 0;
  const hoursLeft = Math.floor((time / (1000 * 60 * 60)) % 24);
  return hoursLeft;
}

const ProgressBar: FC<IProgressBarProps> = ({
  moneyHave, moneyNeed, closedAt}: IProgressBarProps) => {

  const [percentPrg, setPercentPrg] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);

  useEffect(() => {
    setPercentPrg(calculatePercent(moneyHave, moneyNeed));
    setDaysLeft(calculateDays(closedAt));
    setHoursLeft(calculateHours(closedAt));
  }, [moneyHave]);

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
            {moneyHave} Зібрано
          </Box>
          <Box component='div' sx={{
            display: 'inline',
            fontSize: 'h6.fontSize',
            marginLeft: 'auto'
          }}>
            {percentPrg.toFixed(2)}% суми
          </Box>
        </Box>
        <Line
          percent={percentPrg}
          strokeWidth={4}
          trailWidth={4}
          trailColor='#fcd700'
          strokeColor='#005aa9' />
        <Box>
          Left: {daysLeft} day(s) {hoursLeft} hour(s)
        </Box>
      </Box>
    </Container>
  );
};

export default ProgressBar;