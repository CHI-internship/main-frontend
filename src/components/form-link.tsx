import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import linkStyles from '../styles/link-styles';
import { Typography } from '@mui/material';

type FormLinkProps = {
  path: string;
  title?: string;
  styles?: {};
};

const FormLink: FC<FormLinkProps> = props => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Typography sx={{ textAlign: 'center' }}>
      <Link
        to={props.path}
        style={{
          ...linkStyles.default,
          ...props.styles,
          ...(isHover ? linkStyles.hover : null),
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {props.title}
      </Link>
    </Typography>
  );
};

FormLink.defaultProps = {
  title: 'Form Link',
  styles: {},
};

export default FormLink;
