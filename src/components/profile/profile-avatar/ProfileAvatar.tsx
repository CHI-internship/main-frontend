import { useState, useRef, useContext } from 'react'
import { userService } from '../../../api'
import { base64 } from '../../../utils'
import style from './ProfileAvatar.module.scss';
import addIcon from '../../../images/icons/add.icon.svg';
import { CurrentUserContext } from '../../../context';

interface IProfileAvatarProps {
  initialAvatar?: string;
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> =
  ({ initialAvatar }: IProfileAvatarProps) => {
    const { user, setUser } = useContext(CurrentUserContext)
    const [disableSend, setDisableSend] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    async function handleUpload(e: any) {
      if (e.target.files[0]) {
        const image = await base64(e.target.files[0])
        if (image) userService.updateProfile({ image })
          .then((data => setUser({ ...user, photo: data.photo })))
          .finally(() => setDisableSend(false))
      }
    }

    return (
      <div className={style.container}>
        <div
          className={style.avatar}
          style={{ backgroundImage: `url(${user?.photo ?? initialAvatar})` }}
        ></div>
        <div className={style.upload} onClick={() => ref.current?.click()}>
          <img className={style.addIcon} src={addIcon} />
          <input
            ref={ref}
            type='file'
            accept='image/*'
            disabled={disableSend}
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    );
  };

ProfileAvatar.defaultProps = {
  initialAvatar: 'http://cdn.onlinewebfonts.com/svg/img_264570.png',
};
