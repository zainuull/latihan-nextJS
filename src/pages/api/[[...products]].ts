// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getData, getDataById } from '@/lib/firebase/services';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IData {
  status: boolean;
  statusCode: number;
  data: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IData>) {
  if (req.query.products![1]) {
    const data = await getDataById('/products', req.query.products![1]);
    res.status(200).json({ status: true, statusCode: 200, data });
  } else {
    const data = await getData('/products');
    res.status(200).json({ status: true, statusCode: 200, data });
  }
}
