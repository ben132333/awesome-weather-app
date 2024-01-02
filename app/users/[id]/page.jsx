import { prisma } from '@/lib/prisma';
import AuthCheck from '@/components/AuthCheck';
import WeatherCard from '@/components/WeatherCard';

export default async function User({ userId }) {
  const searches = await prisma.search.findMany({
    where: {
      userId: userId,
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