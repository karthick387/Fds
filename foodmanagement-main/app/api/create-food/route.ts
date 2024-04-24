import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

export async function handler(
  req: Request,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const foodData = await req.json();
  const foodName = foodData.data.foodName;
  const peopleToBeServed = foodData.data.peopleToBeServed;
  const venue = foodData.data.venue;
  const description = foodData.data.description;
  const contactNo = foodData.data.contactNo;
  const userId = foodData.data.userId;
  console.log("USERID:", userId);
    
  try {
      const existingRecord = await prisma.food.create({
        data: {
            foodName,
            peopleToBeServed,
            venue,
            description,
            contactNo,
            user: {
                connect: { id: userId },
              },
          },
      });

      if (!existingRecord) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }else {
        return Response.json({ existingRecord }, { status: 200 });
      }
    } catch (error) {
      console.error('Error creating food records:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export { handler as POST };
