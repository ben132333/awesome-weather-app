import UserCard from '../../components/UserCard';
import SearchResults from '@/components/SearchResults';
import styles from '../page.module.css';
import { prisma } from '@/lib/prisma';
import AuthCheck from '@/components/AuthCheck';

export default async function Admin() {
  const users = await prisma.user.findMany();
  const searches = await prisma.search.findMany();

  return (
    <div className={styles.grid}>
      <h1>Admin Panel</h1>
      <AuthCheck>
      <h1>User List</h1>
        {users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}

        <SearchResults searches={searches} />
      </AuthCheck>
    </div>
  );
}