import { NavGreetUserIcon1, NavGreetUserIcon2 } from '../data/Icons';

export default function GreetUser({ userInfo }) {
  const userEmail = userInfo?.data?.userInfo?.email;
  const userName = userInfo?.data?.userInfo?.username?.slice(0, 5);

  return (
    <div className='flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 via-blue-200 to-pink-50'>
      <h1 className='text-3xl font-bold text-[#231F20] leading-9'>Overview</h1>
      <div className='flex items-center'>
        <div className='flex text-5xl round mr-3'>
          <NavGreetUserIcon1 />
        </div>
        <div className='flex text-5xl round mr-2'>
          <NavGreetUserIcon2 />
        </div>
        <div>
          <h2 className='text-lg font-bold text-[#231F20] leading-6'>
            Welcome back, {userName}
          </h2>
          <h6 className='text-xs font-normal text-gray-400 leading-4'>
            {userEmail}
          </h6>
        </div>
      </div>
    </div>
  );
}
