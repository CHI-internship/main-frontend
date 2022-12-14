export interface IHint {
  id: number,
  title: string,
  info: string,
  user_id: number,
  createdAt: Date
  hint_photo?: IHintPhoto[]
}

interface IHintPhoto {
  id: number,
  photo: string,
  createdAt: Date
}

export interface ICreateHint {
  title: string,
  info: string,
  photo?: string | string[]
}

export interface IUpdateHint {
  title: string,
  info: string,
  photo?: string | string[]
}