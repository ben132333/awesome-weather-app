import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return NextResponse.unauthorized();
  }
  
  const req_data = await req.json();

  const city = req_data.city?.toLowerCase();
  const time = req_data.currentTime;
  const weather = req_data.weatherString;
  console.log(req_data);

  if (!city || !time || !weather) {
    return NextResponse.json({"Error": "Missing data"}, { status: 400});
  }
  // TODO: add validation for time and weather

  const existingRecord = await prisma.search.findFirst({
    where: {
      userId: currentUserId,
      city: city,
      time: time,
      weather: weather,
    },
  });

  if (existingRecord) {
    return NextResponse.json(existingRecord, { status: 200 });
  }

  const record = await prisma.search.create({
    data: {
      userId: currentUserId,
      city: city,
      time: time,
      weather: weather,
    },
  });

  return NextResponse.json(record, { status: 200 });

}

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.unauthorized();
  }

  const currentUserId = session?.user?.id;

  const records = await prisma.search.findMany({
    where: {
      userId: currentUserId,
    },
  });

  return NextResponse.json(records, { status: 200 });
}