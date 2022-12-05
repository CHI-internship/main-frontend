import { Box } from '@mui/material';
import { Line } from 'rc-progress';
import { FC, useEffect, useState } from 'react';

interface IProgressBarProps {
  moneyHave: number
  moneyNeed: number
  closedAt: Date
  size?: 'small' | 'large'
}

function calculatePercent(moneyHave: number, moneyNeed: number) {
  if (!moneyNeed) return 0;

  const percent = (moneyHave * 100) / moneyNeed;
  return percent;
}

function calculateDays(date: Date) {
  if (!date.getTime()) return 0;
  const time = date.getTime() - new Date().getTime();
  if (time < 0) return 0;
  const daysLeft = Math.floor(time / (1000 * 60 * 60 * 24));
  return daysLeft;
}

function calculateHours(date: Date) {
  if (!date.getTime()) return 0;
  const time = date.getTime() - new Date().getTime();
  if (time < 0) return 0;
  const hoursLeft = Math.floor((time / (1000 * 60 * 60)) % 24);
  return hoursLeft;
}

const ProgressBar: FC<IProgressBarProps> = ({
  moneyHave, moneyNeed, closedAt, size }) => {

  const [percentPrg, setPercentPrg] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);

  useEffect(() => {
    setPercentPrg(calculatePercent(moneyHave, moneyNeed));
    setDaysLeft(calculateDays(closedAt));
    setHoursLeft(calculateHours(closedAt));
  }, [moneyHave]);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} >
        <Box component='div' sx={{
          display: 'inline',
          fontSize: `${size === 'small' ? '14px' : '17px'}`
        }}>
          {moneyHave} Зібрано
        </Box>
        <Box component='div' sx={{
          display: 'inline',
          fontSize: `${size === 'small' ? '14px' : '17px'}`,
          marginLeft: 'auto'
        }}>
          {percentPrg.toFixed(2)}% суми
        </Box>
      </Box>
      <Line style={{ height: `${size === 'small' ? '5px' : '10px'}`, width: '100%' }}
        percent={percentPrg}
        strokeWidth={4}
        trailWidth={4}
        trailColor='#fcd700'
        strokeColor='#005aa9' />
      <Box sx={{ fontSize: `${size === 'small' ? '12px' : '17px'}` }}>
        Left: {daysLeft} day(s) {hoursLeft} hour(s)
      </Box>
    </div>
  );
};

ProgressBar.defaultProps = {
  size: 'small'
}
export default ProgressBar;