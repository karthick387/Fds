import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: Request,
  res: NextApiResponse
) {
  const foodRequest = await req.json();
  const foodRequestStatus = foodRequest.data.foodRequestStatus;
  const distributorStatus = foodRequest.data.distributorStatus;
  const prisma = new PrismaClient()
  const url = req.url;
  let foodReqId: string | undefined | null;
  if (url) {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    foodReqId = parts[parts.length - 1];

    try {
      const existingRecord = await prisma.foodRequest.findUnique({
        where: { foodReqId: Number(foodReqId) },
      });

      if (!existingRecord) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }

      const updatedFoodRequestRecord = await prisma.foodRequest.update({
        where: { foodReqId: Number(foodReqId) },
        data: {
            foodRequestStatus,
            distributorStatus,
        },
      });

      return Response.json({ updatedFoodRequestRecord }, { status: 200 });
    } catch (error) {
      console.error('Error updating distributor status of food request record:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return Response.json({ error: 'Invalid request' });
  }

}

  export { handler as PUT };