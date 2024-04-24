import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

export async function handler(
  req: Request,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const foodRequestData = await req.json();
  const foodRequestStatus = foodRequestData.data.foodRequestStatus;
  const distributorStatus = foodRequestData.data.distributorStatus;
  const foodId = foodRequestData.data.foodId;
  const requestingUserId = foodRequestData.data.requestingUserId;
  const requestedDistributorId = foodRequestData.data.requestedDistributorId;
    
  try {
      const existingRecord = await prisma.foodRequest.create({
        data: {
            foodRequestStatus,
            distributorStatus,
            food: {
                connect: { foodId: foodId },
              },
              requestingId: {
                connect: { id: requestingUserId },
              },      
              distributorId: {
                connect: { id: requestedDistributorId },
              },
          },
      });

      if (!existingRecord) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }else {
        return Response.json({ existingRecord }, { status: 200 });
      }
    } catch (error) {
      console.error('Error creating food request records:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export { handler as POST };
