import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const email = /* req.query.email */ "fa12345thima@gmail.com";

  const {
    userType,
  } = req.body.data;

  if (req.method === 'PUT') {
    try {
      const existingRecord = await prisma.user.findFirst({
        where: { email: String(email) },
      });

      if (!existingRecord) {
        res.status(404).json({ success: false, error: 'Record not found' });
        return;
      }

      const updatedUserRecord = await prisma.user.update({
        where: { email: String(email) },
        data: {
          userType,
        },
      });

      res.status(200).json({ success: true, updatedUserRecord });
    } catch (error) {
      console.error('Error updating user record:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
