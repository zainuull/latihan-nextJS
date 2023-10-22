import Image from 'next/image';
import bg from '../../../../public/bg.png';
import logo from '../../../../public/Logo.png';
import { BsFillPersonFill, BsKey } from 'react-icons/bs';

const LoginPage = () => {
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
            <form className="flex flex-col gap-y-10 mt-10">
              <div className="rounded-lg w-full flex items-center gap-x-2 bg-black/30 h-14 px-4 text-sm hover:border-white transition">
                <BsFillPersonFill size={20} className="text-[#E8FF00]" />
                <input className="bg-transparent w-full outline-none" placeholder="Username" />
              </div>
              <div className="rounded-lg w-full flex items-center gap-x-2 bg-black/30 h-14 px-4 text-sm hover:border-white transition">
                <BsKey size={20} className="text-[#E8FF00]" />
                <input className="bg-transparent w-full outline-none" placeholder="Password" />
              </div>
              <div className="mt-2 w-full flex flex-col gap-y-2">
                <button className="bg-[#808658] h-12 rounded-lg hover:bg-[#6C7248] transition cursor-pointer w-full">
                  Login
                </button>
                <p className="text-white mt-4 text-xs cursor-pointer hover:text-gray-200 transition">
                  Forgot Password ?
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
