import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';
import AuthCheck from '../components/AuthCheck';
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from '../components/SignOutButton';

export default function NavMenu() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        
        <li>
          <Link href={'/'}>
            <button className="btn-logo">AWA</button>
          </Link>
        </li>
      
        <li>
          <SignInButton />
        </li>

        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>

      </ul>
    </nav>
  );
}