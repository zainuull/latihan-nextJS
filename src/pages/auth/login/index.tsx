import Image from 'next/image';
import bg from '../../../../public/bg.png';
import logo from '../../../../public/Logo.png';
import { BsFillPersonFill, BsKey } from 'react-icons/bs';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push, query } = useRouter();

  const callbackURL: any = query.callbackUrl || '/';
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackURL,
      });
      if (!res?.error) {
        setIsLoading(false);
        push(callbackURL);
      } else {
        setIsLoading(false);
        setError('Email or Password is incorrect');
      }
    } catch (err) {
      setIsLoading(false);
      setError('Email or Password is incorrect');
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <Image src={bg} alt="background" className="object-cover w-full min-h-screen" />
      <div className="absolute top-0 w-full flex flex-col px-12">
        <div className="flex items-center mt-6 gap-x-6">
          <Image src={logo} alt="logo" className="w-[100px]" />
          <h1 className="text-white/80 text-2xl font-semibold">Login</h1>
        </div>
        <div className="w-full flex justify-center items-center mt-12">
          <div className="shadow-xl p-10 rounded-lg flex flex-col w-1/3 bg-white/10 text-white pb-12">
            <h1 className="text-center text-3xl font-semibold">Sign In</h1>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <form className="flex flex-col gap-y-10 mt-8" onSubmit={handleSubmit}>
              <div className="rounded-lg w-full flex items-center gap-x-2 bg-black/30 h-14 px-4 text-sm hover:border-white transition">
                <BsFillPersonFill size={20} className="text-[#E8FF00]" />
                <input
                  id="email"
                  type="mail"
                  className="bg-transparent w-full outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="rounded-lg w-full flex items-center gap-x-2 bg-black/30 h-14 px-4 text-sm hover:border-white transition">
                <BsKey size={20} className="text-[#E8FF00]" />
                <input
                  id="password"
                  type="password"
                  className="bg-transparent w-full outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="mt-2 w-full flex flex-col gap-y-2">
                <button
                  className="bg-[#808658] h-12 rounded-lg hover:bg-[#6C7248] transition cursor-pointer w-full"
                  disabled={isLoading}>
                  {isLoading ? 'Loading....' : 'Login'}
                </button>
                <p className="text-white mt-4 text-xs cursor-pointer hover:text-gray-200 transition">
                  Don't have an account ?{' '}
                  <Link href={'/auth/register'} className="font-semibold">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
