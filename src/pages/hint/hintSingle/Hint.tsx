import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { AxiosError } from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { hintsService } from '../../../api';
import ErrorAlert from '../../../components/ErrorAlert/ErrorAlert';
import UpdateHint from '../../../components/hint/updateHint/UpdateHint';
import { CurrentUserContext } from '../../../context';
import { IHint } from '../../../types/hint.types';
import style from './Hint.module.scss';

const Hint: FC = () => {
  const { user } = useContext(CurrentUserContext);
  const [hint, setHint] = useState<IHint>();
  const [error, setError] = useState(null as AxiosError);
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const getHint = () => {
    hintsService.getHintById(id).then(value => {
      setHint(value);
    }).catch(error => {
      setError(error);
    });
  };

  useEffect(() => {
    getHint();
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <div className={style.container}>
      {error && <ErrorAlert error={error} />}
      <div className={style.main}>
        <div className={style.title}>
          <h2>{hint?.title}</h2>
        </div>
        {user?.role === 'volunteer' && user.id === hint.user_id &&
          <div className={style.editing}>
            <UpdateHint open={open} handleClose={handleClose} />
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </div>
        }
      </div>
      <p>{hint?.info}</p>
      <div className={style.images}>
        {hint?.hint_photo?.map(value =>
          <div
            key={value.id}
            className={style.image}
            style={{ backgroundImage: `url(${value?.photo})` }}
          />
        )}
      </div>
    </div>
  );
};

export default Hint;