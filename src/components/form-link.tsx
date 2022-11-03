import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import linkStyles from '../styles/link-styles';
import { Typography } from '@mui/material';

type PropType = {
  linkConfig: {
    path: string;
    title: string;
    styles?: {};
  };
};

const FormLink: FC<PropType> = ({ linkConfig }: PropType): ReactElement => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Typography sx={{ textAlign: 'center' }}>
      <Link
        to={linkConfig.path}
        style={{
          ...linkStyles.default,
          ...linkConfig.styles,
          ...(isHover ? linkStyles.hover : null),
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {linkConfig.title}
      </Link>
    </Typography>
  );
};

export default FormLink;
