import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { hintsService } from '../../../api';
import ErrorAlert from '../../../components/ErrorAlert/ErrorAlert';
import Pagination from '../../../components/pagination/Pagination';
import { CurrentUserContext } from '../../../context';
import logo from '../../../images/Logo.svg'
import { IHint } from '../../../types/hint.types';
import style from './Hints.module.scss';

const Hints: FC = () => {
  const { user } = useContext(CurrentUserContext);
  const [hints, setHints] = useState<IHint[]>([]);
  const [error, setError] = useState(null as AxiosError);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const getHints = (page = 1) => {
    hintsService.getHints(page).then(value => {
      setHints(value.data);
      setTotalPages(value.totalPages);
      return value;
    }).catch(error => {
      setError(error);
      setHints([]);
    });
  };

  const handlePagination = (page: number) => {
    getHints(page);
  };

  useEffect(() => {
    getHints();
  }, []);

  const createHint = () => {
   navigate('/hints/create')
  }

  return (
    <div className={style.container}>
      {error && <ErrorAlert error={error} />}
      <h2>Volonteers Hints</h2>
      {user?.role === 'volunteer' &&
        <Button
          className={style.createButton}
          onClick={createHint}
          color='success'
          variant='outlined'
        >Create
        </Button>
      }
      {hints?.map(hint =>
        <Link key={hint.id} to={hint.id.toString()}>
          <div className={style.hint}>
            <div
              className={style.avatar}
              style={{ backgroundImage: `url(${hint.hint_photo.length ? hint?.hint_photo[0].photo : logo})` }}
            />
            <div className={style.title}>
              <h4>{hint.title}</h4>
              {hint.info}
            </div>
          </div>
        </Link>
      )}
      {hints.length ?
      <Pagination totalCount={totalPages} getPage={handlePagination} />: <h3>Sorry, no hints </h3>
      }
    </div>
  );
};

export default Hints;