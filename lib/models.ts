import { ObjectId } from "mongodb";

export interface IProduct {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
}
