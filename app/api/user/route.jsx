// import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request) {
  // const session = await getServerSession(authOptions);

  // const currentUserId = session?.user?.id;

  // const users = await prisma.user.findUnique({ where: { id: currentUserId } });
  // console.log(users);

  // return NextResponse.json(users);
  return NextResponse.json({ "hello": "world" });
}