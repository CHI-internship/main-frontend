import { AxiosError } from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { hintService } from '../../../api';
import ErrorAlert from '../../../components/ErrorAlert/ErrorAlert';
import Pagination from '../../../components/pagination/Pagination';
import { CurrentUserContext } from '../../../context';
import { IHint } from '../../../types/hint.types';
import style from './Hints.module.scss';

const Hints: FC = () => {
  const { user } = useContext(CurrentUserContext);
  const [hints, setHints] = useState<IHint[]>([]);
  const [error, setError] = useState(null as AxiosError);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const getHints = (page = 1) => {
    hintService.getHints(page).then(value => {
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
   navigate('/about')
  }

  return (
    <div className={style.container}>
      {error && <ErrorAlert error={error} />}
      <h2>Volonteers Hints</h2>
      {user?.role === 'volunteer' &&
        <button
          className={style.createButton}
          onClick={createHint}
        >Create Hint
        </button>
      }
      {hints?.map(hint =>
        <Link key={hint.id} to={hint.id.toString()}>
          <div className={style.hint}>
            <h4>{hint.title}</h4>
            {hint.info}
          </div>
        </Link>
      )}
      {hints.length ?
      <Pagination totalCount={totalPages} getPage={handlePagination} />: ''
      }
    </div>
  );
};

export default Hints;