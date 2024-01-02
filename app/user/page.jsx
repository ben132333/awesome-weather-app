import SearchResults from '@/components/SearchResults';
import styles from '../page.module.css';
import { prisma } from '@/lib/prisma';
import AuthCheck from '@/components/AuthCheck';
import WeatherCard from '@/components/WeatherCard';
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function User() {
  const session = await getServerSession(authOptions);
  const searches = await prisma.search.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div>
      <h1>User Page</h1>

      <AuthCheck>
        <h2>Previous Searches</h2>
        {searches.map((search, index) => (
          <WeatherCard key={index} weatherData={JSON.parse(search.weather)} />
        ))}
      </AuthCheck>
    </div>
  );
}