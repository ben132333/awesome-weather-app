import Link from 'next/link';
import styles from './UserCard.module.css';

export default function UserCard({ id, name, age, image }) {
  return (
    <div className={styles.card}>
      <img
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3>
          <Link href={`/users/${id}`}>{name}</Link>
        </h3>
      </div>
    </div>
  );
}