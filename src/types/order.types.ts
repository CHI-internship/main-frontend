export interface IOrder {
  id: number;
  title: string;
  info: string;
  user_id: number;
  photo: string;
  goal_amount: number;
  sum: number;
  short_info: string;
  finished_at: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderResponse {
  limit: number;
  page: number;
  totalPages: number;
  data: IOrder[];
}
