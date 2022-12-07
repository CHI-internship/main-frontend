export interface IHint {
  id: number,
  title: string,
  info: string,
  user_id: number,
  createdAt: Date
  hint_photo: IHintPhoto[]
}

interface IHintPhoto {
  id: number,
  text: string,
  photo: string,
  createdAt: Date
}