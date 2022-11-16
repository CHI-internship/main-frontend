import { useState, useRef } from 'react'
import style from './ProfileAvatar.module.scss'
import addIcon from '../../../images/icons/add.icon.svg'
import userService from '../../../api/user.service'

interface IProfileAvatarProps {
  userId: number
  initialAvatar?: string
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> =
  ({ userId, initialAvatar }: IProfileAvatarProps) => {

    const [avatarUrl, setAvatarUrl] = useState(initialAvatar)
    const [disableSend, setDisableSend] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    function handleUpload(e: any) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = async function () {
          setDisableSend(true)
          await userService.updatePofile({ userId, imgBase64: reader.result })
            .then((data => setAvatarUrl(data.photo)))
            .finally(() => setDisableSend(false))
        }
        reader.readAsDataURL(file)
      }
    }

    return (
      <div className={style.container}>
        <div className={style.avatar}
          style={{ backgroundImage: `url(${avatarUrl})` }}></div>
        <div className={style.upload} onClick={() => ref.current?.click()}>
          <img className={style.addIcon} src={addIcon} />
          <input ref={ref}
            type='file'
            accept='image/*'
            disabled={disableSend}
            onChange={handleUpload}
            style={{ display: 'none' }} />
        </div>
      </div >
    )
  }

ProfileAvatar.defaultProps = {
  initialAvatar: 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
}