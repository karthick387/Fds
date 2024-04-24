import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: Request,
  res: NextApiResponse
) {
  const user = await req.json();
  const userType = user.data.userType;
  const orgName = user.data.orgName;
  const address = user.data.address;
  const contactNo = user.data.contactNo;
  const todayDate = user.data.todayDate;
  const startTime = user.data.startTime;
  const endTime = user.data.endTime;
    console.log("REQUEST BODY:", userType);
  const prisma = new PrismaClient()
  const url = req.url;
  let email: string | undefined | null;
  if (url) {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    email = parts[parts.length - 1];

    try {
      const existingRecord1 = await prisma.user.findFirst({
        where: { email: String(email) },
      });

      if (!existingRecord1) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }

      const existingRecord = await prisma.user.update({
        where: { email: String(email) },
        data: {
          userType,
          orgName,
          address,
          contactNo,
          todayDate,
          startTime,
          endTime,
        },
      });

      return Response.json({ existingRecord }, { status: 200 });
    } catch (error) {
      console.error('Error updating user record:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return Response.json({ error: 'Invalid request' });
  }

}

  export { handler as PUT };