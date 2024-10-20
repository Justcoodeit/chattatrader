import React from 'react';
import {
  FaApple,
  FaDiscord,
  FaLinode,
  FaPlus,
  FaTwitter,
} from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { Eye } from 'lucide-react';
import RecentContacts from './Contact';
import TrendingCard from './TrendingCard/TrendingCard';
import RecentActivities from './RecentActivities/RecentActivities';

const stats = [
  { label: 'Market Cap', value: '$734.00', discount: '+23.6%' },
  { label: 'Fully Deluted', value: '$134.00', discount: '+23.6%' },
  { label: 'Available Margin', value: '$1,734.00', discount: '+23.6%' },
];

  const trendingData = [
    {
      rank: 1,
      category: 'SWAPS',
      blockchain: 'Solana',
      token: 'wstETH',
      price: '+278.89%',
      users: '3487',
      volume: '$06.078 348ETH',
      topSales: [
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
      ],
    },
    {
      rank: 1,
      category: 'SWAPS',
      blockchain: 'Ethereum',
      token: 'wstETH',
      price: '+278.89%',
      users: '3487',
      volume: '$06.078 348ETH',
      topSales: [
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
      ],
    },
    {
      rank: 1,
      category: 'NFT SALES',
      blockchain: 'Ethereum',
      token: 'wstETH',
      price: '+278.89%',
      users: '3487',
      volume: '$06.078 348ETH',
      topSales: [
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
        { amount: '4ETH SELL', time: '11hrs ago' },
      ],
    },
  ];

function Discovery() {
  return (
    <div className=''>
      <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 bg-[#008080] rounded-xl p-4 sm:p-8'>
        <div className='flex flex-col w-full sm:w-auto'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='flex flex-col items-start text-white'>
              <div className='flex justify-center gap-3'>
                <p className='text-[#FFFFFF] font-medium'>
                  ChatterTrade Balance
                </p>
                <Eye />
              </div>
              <div className='text-[#fff] rounded-sm p-1'>
                <p className='text-3xl flex  '>
                  $12,455.00
                  <span className='text-sm font-medium '>{'Sol'}</span>
                </p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {stats.map((stat) => (
              <div key={stat.label} className='p-4 rounded-lg'>
                <h3 className='text-base font-semibold text-white'>
                  {stat.label}
                </h3>
                <div className='flex items-center gap-4 '>
                  <p className='text-lg font-bold text-white'>{stat.value}</p>
                  <p className=' bg-[#D5FFFF] w-[50px] h-[20px]  text-[14px] '>
                    {stat.discount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4 text-white w-full sm:w-auto'>
          <div className='flex justify-between gap-10'>
            <div className='flex gap-4 items-center'>
              <p>Transaction History</p>
              <p>*</p>
            </div>
          </div>
          <div className='flex justify-between gap-10'>
            <div className='flex items-center flex-col '>
              <div className=' bg-[#E6E21A] w-[32px] h-[32px] flex items-center justify-center'>
                <FaPlus />
              </div>
              <p className='text-sm text-[#FAFAFA]'>Buy</p>
            </div>
            <div className='flex flex-col items-center'>
              <div className=' bg-[#E6E21A] w-[32px] h-[32px] flex items-center justify-center'>
                <BiTransfer />
              </div>

              <p className='text-sm'>Transfer</p>
            </div>
            <div className='flex flex-col items-center'>
              <div className=' bg-[#E6E21A] w-[32px] h-[32px] flex items-center justify-center'>
                <FaLinode />
              </div>

              <p className='text-sm'>Withdraw</p>
            </div>
          </div>
        </div>
      </div>
      <RecentContacts />
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          {trendingData.map((card, index) => (
            <TrendingCard key={index} {...card} />
          ))}
        </div>
        <div className='w-1/3'>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}

export default Discovery;




