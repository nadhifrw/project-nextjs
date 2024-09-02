import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SignOut } from './auth/signout-button';

export default async function Navbar() {
  const session = await auth();

  return (
    <div className='bg-gray-400 border-b'>
      <div className='flex items-center justify-between max-w-4xl mx-auto py-4 text-black'>
        <Link href='/dashboard'>HOME</Link>
        {/* {session ? 'signout':<SignOut /> } */}
        <SignOut />
      </div>
    </div>
  );
}