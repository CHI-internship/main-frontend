import { useState, useRef } from 'react'
import style from './ProfileAvatar.module.scss'
import addIcon from '../../../images/icons/add.icon.svg'

interface IProfileAvatarProps {
  userId: number
  initialAvatar?: string
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> =
  ({ userId, initialAvatar }: IProfileAvatarProps) => {
    const [avatar, setAvatar] = useState<any>(initialAvatar)
    const ref = useRef<HTMLInputElement>(null)

    return (
      <div className={style.container}>
        <div className={style.avatar} style={{ backgroundImage: `url(${avatar})` }}>
        </div>
        <div className={style.upload} onClick={() => ref.current?.click()}>
          <img className={style.addIcon} src={addIcon} />
          <input ref={ref}
            type='file'
            accept='image/*'
            onChange={() => { }}
            style={{ display: 'none' }}
          />
        </div>
      </div >
    )
  }

ProfileAvatar.defaultProps = {
  initialAvatar: 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
}