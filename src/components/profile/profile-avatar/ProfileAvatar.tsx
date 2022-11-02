import { useState, useRef } from 'react'
import style from './ProfileAvatar.module.scss'
import addIcon from '../../../images/icons/add.icon.svg'
import { updateProfilePhoto } from '../../../api/user/update-profile'

interface IProfileAvatarProps {
  userId: number
  initialAvatar: string | null
}

export default function ProfileAvatar({ userId, initialAvatar }: IProfileAvatarProps) {
  const [avatar, setAvatar] = useState<string | null>(initialAvatar)
  const ref = useRef<HTMLInputElement>(null)

  async function updatePhotoHandler(file: any) {
    await updateProfilePhoto(userId, file)
      .then(data => setAvatar(data))
  }

  return (
    <div className={style.container}>
      <div className={style.avatar} style={{
        backgroundImage: `url(${process.env.REACT_APP_BASE_SERVICE_URL +
          (avatar ?? 'image/default/default-avatar.png')})`
      }}>
      </div>
      <div className={style.upload} onClick={() => ref.current?.click()}>
        <img className={style.addIcon} src={addIcon} />
        <input ref={ref}
          type='file'
          accept='image/*'
          onChange={(e: any) => { updatePhotoHandler(e.target.files[0]) }}
          style={{ display: 'none' }}
        />
      </div>
    </div >
  )
}