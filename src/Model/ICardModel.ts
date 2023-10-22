export interface ICard {
  status: boolean;
  statusCode: number;
  data: IDataCardModel[];
}

export interface IDataCardModel {
  id?: string;
  name?: string;
  price?: number;
  category?: string;
  size?: string;
  img?: string;
}
