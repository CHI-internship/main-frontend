import { useState, useRef } from 'react'
import userService from '../../../api/user.service'
import { base64 } from '../../../utils'
import style from './ProfileAvatar.module.scss';
import addIcon from '../../../images/icons/add.icon.svg';

interface IProfileAvatarProps {
  userId: number;
  initialAvatar?: string;
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> =
  ({ userId, initialAvatar }: IProfileAvatarProps) => {
    const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
    const [disableSend, setDisableSend] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    async function handleUpload(e: any) {
      if (e.target.files[0]) {
        const image = await base64(e.target.files[0])
        if (image) userService.updateProfile({ userId, image })
          .then((data => setAvatarUrl(data.photo)))
          .finally(() => setDisableSend(false))
      }
    }

    return (
      <div className={style.container}>
        <div
          className={style.avatar}
          style={{ backgroundImage: `url(${avatarUrl})` }}
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
