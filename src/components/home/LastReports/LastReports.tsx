import { Box } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './LastReports.module.scss';

const LastReports: FC = () => {
  const reports = [
    {
      id: 1,
      title: 'Test order',
      shortInfo:
        'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
      photos: [
        'https://loremflickr.com/640/480/business',
        'https://loremflickr.com/640/480/business',
      ],
    },
    {
      id: 2,
      title: 'Test order1',
      shortInfo:
        'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
      photos: [
        'https://loremflickr.com/640/480/business',
        'https://loremflickr.com/640/480/business',
      ],
    },
    {
      id: 3,
      title: 'Test order2',
      shortInfo:
        'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
      photos: ['https://loremflickr.com/640/480/business'],
    },
  ];

  return (
    <Box className={style.lastReportsList}>
      {reports.map(report => {
        return (
          <Link to='reports' key={report.id}>
            <div className={style.card}>
              <div className={style.img}>
                {report.photos.map((photo, index) => {
                  return (
                    <img
                      src={photo}
                      alt='report'
                      height='140px'
                      width='270px'
                      key={index}
                    />
                  );
                })}
              </div>
              <div className={style.title}>{report.title}</div>
              <div className={style.shortInfo}>{report.shortInfo}</div>
            </div>
          </Link>
        );
      })}
    </Box>
  );
};

export default LastReports;
