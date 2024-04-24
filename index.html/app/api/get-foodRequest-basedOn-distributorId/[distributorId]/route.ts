import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const url = req.url;
  let distributorId: string | undefined | null;
  if (url) {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    distributorId = parts[parts.length - 1];
  } else {
    return Response.json({ error: 'Invalid request' });
  }

    try {
      const existingRecord = await prisma.foodRequest.findFirst({
        where: { requestedDistributorId: String(distributorId) },
        include: {
          food: {
          include: {
            user: true,
          }
        },
            requestingId: true,
            distributorId: true,
        }
      });

      if (!existingRecord) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }else {
        return Response.json({ existingRecord }, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching food request records based on distributor id:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export { handler as GET };
