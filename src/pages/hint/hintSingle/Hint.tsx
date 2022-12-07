import { AxiosError } from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { hintService } from '../../../api';
import ErrorAlert from '../../../components/ErrorAlert/ErrorAlert';
import { CurrentUserContext } from '../../../context';
import { IHint } from '../../../types/hint.types';
import style from './Hint.module.scss';

const Hint: FC = () => {
  const { user } = useContext(CurrentUserContext);
  const [hint, setHint] = useState<IHint>();
  const [error, setError] = useState(null as AxiosError);

  const { id } = useParams();

  const getHint = () => {
    hintService.getHintById(id).then(value => {
      setHint(value);
    }).catch(error => {
      setError(error);
    });
  };

  useEffect(() => {
    getHint();
  }, []);

  return (
    <div className={style.container}>
      {error && <ErrorAlert error={error} />}
      <h2>{hint?.title}</h2>
      <p>{hint?.info}</p>
      <div className={style.images}>
        {hint?.hint_photo?.map(value =>
          <div
            key={value.id}
            className={style.image}
            style={{ backgroundImage: `url(${value?.photo})` }}
          >
          </div>
        )}
      </div>
    </div>
  );
};

export default Hint;