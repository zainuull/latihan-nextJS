// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: boolean;
  statusCode: number;
  data: {
    name: string;
    age: number;
  }[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = [
    {
      name: 'Zainul',
      age: 21,
    },
    {
      name: 'Basyar',
      age: 25,
    },
  ];
  res.status(200).json({ status: true, statusCode: 200, data });
}
