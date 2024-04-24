import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()

    try {
      const existingRecord = await prisma.food.findMany({});

      if (!existingRecord) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }else {
        return Response.json({ existingRecord }, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching all food records:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export { handler as GET };
