import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const data: any = useSession();
  const user = data.data?.user

  return (
    <div className="bg-green-600 h-24 flex items-center justify-between px-12">
      <div className="flex items-center gap-x-4">
        <Link href={'/'} className="text-white text-2xl font-bold">
          CodingIndo
        </Link>
        {user?.fullName && (
          <h1 className="text-2xl font-light text-white">Welcome {data.data.user?.fullName}</h1>
        )}
      </div>
      <div className="flex items-center justify-evenly w-[700px]">
        <Link href={'/product'}>
          <h2 className="text-white text-xl bg-green-400 rounded-lg p-2">Client Side</h2>
        </Link>
        <Link href={'/product/server'}>
          <h2 className="text-white text-xl bg-green-400 rounded-lg p-2">Server Side</h2>
        </Link>
        <Link href={'/product/static'}>
          <h2 className="text-white text-xl bg-green-400 rounded-lg p-2">Static Side</h2>
        </Link>
        {user?.role == 'admin' && (
          <Link href={'/dashboard'}>
            <h2 className="text-white text-xl bg-green-400 rounded-lg p-2">Dashboard</h2>
          </Link>
        )}
        {user && (
          <button
            onClick={() => signOut()}
            className="text-white text-xl bg-green-400 rounded-lg p-2">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
