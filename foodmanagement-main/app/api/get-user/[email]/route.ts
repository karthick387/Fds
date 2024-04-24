import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest } from 'next/server'


export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const url = req.url;
  let email: string | undefined | null;
  if (url) {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    email = parts[parts.length - 1];
  } else {
    return Response.json({ error: 'Invalid request' });
  }

    try {
      const existingRecord = await prisma.user.findFirst({
        where: { email: String(email) },
      });

      if (!existingRecord) {
        return Response.json({ error: "Record not found" }, { status: 404 });
      }else {
        return Response.json({ existingRecord }, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching user records:', error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export { handler as GET };
