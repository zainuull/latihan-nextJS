// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createAccount } from '@/lib/firebase/services';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    await createAccount(req.body, (result: { status: boolean; message: string }) => {
      if (result.status) {
        res.status(200).json({ status: true, message: 'Registrasi akun berhasil' });
      } else {
        res.status(400).json({ status: false, message: 'Email sudah terdaftar' });
      }
    });
  } else {
    res.status(405).json({ status: false, message: 'Method not allowed' });
  }
}
