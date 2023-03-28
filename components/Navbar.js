import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@lib/context';
import { auth } from '@lib/firebase';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

// Top navbar
export default function Navbar({ canWrite }) {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <img className='logoZSET' src='/ZSET.png' alt='Logo ZSET'></img>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOutNow}>Wyloguj</button>
            </li>

            <li>
              <Link href="/admin">
                <button className="btn-blue">Panel admina</button>
              </Link>
            </li>

            <li>
              <Link href={`/${username}`}>
                <img className='profilePic' src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Zaloguj</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}