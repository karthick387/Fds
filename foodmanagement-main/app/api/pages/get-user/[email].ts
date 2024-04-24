import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const email = req.query.email;
  if (req.method === 'GET') {
    try {
      const existingRecord = await prisma.user.findFirst({
        where: { email: String(email) },
      });

      if (!existingRecord) {
        res.status(404).json({ success: false, error: 'Record not found' });
        return;
      } else {
        res.status(200).json(existingRecord);
      }
    } catch (error) {
      console.error('Error fetching user records:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
