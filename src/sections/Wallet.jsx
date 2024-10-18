import {
  FaApple,
  FaDiscord,
  FaLinode,
  FaPlus,
  FaTwitter,
} from 'react-icons/fa';
import CandleStick from '../component/CandleStick';
import { BiTransfer } from 'react-icons/bi';
import { user } from '../assets';

import Navbar from '../component/Navbar';
import GreetUser from '../component/GreetUser';
import PriceNav from '../component/PriceNav';
import AssetNetWorth from '../component/AssetNetWorth';
import Wallets from '../component/Wallets';
import RegisteredUsers from '../component/RegisteredUsers';
import PNLAnalysis from '../component/PNLAnalysis';
import WalletDetails from '../component/WalletDetails';

const Wallet = ({ userInfo }) => {
  const userEmail = userInfo?.data?.userInfo?.email;
  const ethMnemonic = userInfo?.data?.userInfo?.ethMnemonic;
  const ethPrivateKey = userInfo?.data?.userInfo?.ethPrivateKey;
  const ethHolding = userInfo?.data?.userInfo?.ethholding;
  const solMnemonic = userInfo?.data?.userInfo?.solMnemonic;
  const solPrivateKey = userInfo?.data?.userInfo?.solPrivateKey;
  const solWalletAddress = userInfo?.data?.userInfo?.solWalletAddress;
  const username = userInfo?.data?.userInfo?.username;
  const walletAddress = userInfo?.data?.userInfo?.walletAddress;

  console.log({ userEmail, username, walletAddress });

  const stats = [
    { label: 'Total Block', value: '114,568,657' },
    { label: 'Total Transaction', value: '$14,568M' },
    { label: 'Market Cap', value: '$15,680B' },
    { label: 'Total Account', value: '15,680,678' },
  ];

  const assets = [
    { name: 'BTC', price: '$34.56', change: '+2.5%', icon: FaTwitter },
    { name: 'ETH', price: '$145.67', change: '-1.2%', icon: FaApple },
    { name: 'SOL', price: '$78.90', change: '+5.7%', icon: FaDiscord },
  ];

  const portfolioData = [
    {
      asset: 'Solana',
      symbol: 'SOL',
      balance: '$45,780',
      buyPrice: '$1,237.00',
      profit: '28%',
      value: '$45,780',
    },
    {
      asset: 'Bitcoin',
      symbol: 'BTC',
      balance: '£41,56',
      buyPrice: '$45.00',
      profit: '43%',
      value: '$1,237.00',
    },
    {
      asset: 'Bitcoin',
      symbol: 'BTC',
      balance: '£98,55',
      buyPrice: '$23.00',
      profit: '54%',
      value: '$45,780',
    },
    {
      asset: 'Bitcoin',
      symbol: 'BTC',
      balance: '$652,00',
      buyPrice: '$21,990',
      profit: '21%',
      value: '$1,237.00',
    },
    {
      asset: 'Bitcoin',
      symbol: 'BTC',
      balance: '$19,000',
      buyPrice: '$37.00',
      profit: '32%',
      value: '$652,00',
    },
    {
      asset: 'Bitcoin',
      symbol: 'BTC',
      balance: '$32,00',
      buyPrice: '$67.000',
      profit: '12%',
      value: '$45,780',
    },
  ];

  const latestBlocks = [
    {
      block: '1896790',
      time: '5min ago',
      transactions: 12,
      hash: '0xdhf21357gdfhkdm,dsgb56790....',
    },
    {
      block: '1896790',
      time: '5min ago',
      transactions: 34,
      hash: '0xdhf21357gdfhkdm,dsgb56790....',
    },
    {
      block: '1896790',
      time: '5min ago',
      transactions: 34,
      hash: '0xdhf21357gdfhkdm,dsgb56790....',
    },
    {
      block: '1896790',
      time: '5min ago',
      transactions: 34,
      hash: '0xdhf21357gdfhkdm,dsgb56790....',
    },
    {
      block: '1896790',
      time: '5min ago',
      transactions: 34,
      hash: '0xdhf21357gdfhkdm,dsgb56790....',
    },
  ];

  return (
    <div className='h-full flex flex-col p-2 sm:p-6 space-y-4 sm:space-y-6 bg'>
      <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 bg-[#0487E2] rounded-xl p-4 sm:p-8'>
        <div className='flex flex-col w-full sm:w-auto'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-[60px] h-[60px] bg-[#B0D6F5] rounded-full flex items-center justify-center'>
              <img src={user} className='w-[36px] h-[28.22px]' alt='Solana' />
            </div>
            <div className='flex flex-col items-start text-white'>
              {/* <p>Name</p> */}
              <div className='flex gap-6 '>
                <p className=' text-black'>Wallet Address:</p>
                <div className='text-black bg-[#FFFDD2] rounded-sm p-1'>
                  {solWalletAddress}
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {stats.map((stat) => (
              <div key={stat.label} className='p-4 rounded-lg'>
                <h3 className='text-base font-semibold text-white'>
                  {stat.label}
                </h3>
                <p className='text-lg font-bold text-white'>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4 text-white w-full sm:w-auto'>
          <div className='flex justify-between gap-10'>
            <div className='flex flex-col'>
              <p>Value Risk</p>
              <p>*******</p>
            </div>
            <div>
              <p>Value Risk</p>
              <p>*******</p>
            </div>
          </div>
          <div className='flex justify-between gap-10'>
            <div className='flex flex-col items-center'>
              <FaPlus />
              <p className='text-sm'>Buy</p>
            </div>
            <div className='flex flex-col items-center'>
              <BiTransfer />
              <p className='text-sm'>Transfer</p>
            </div>
            <div className='flex flex-col items-center'>
              <FaLinode />
              <p className='text-sm'>Withdraw</p>
            </div>
          </div>
        </div>
      </div>
      <PriceNav />
      <div className='lg:flex-row  flex flex-col  '>
        <div className='basis-[40%]'>
          <AssetNetWorth />
        </div>
        <div className='basis-[30%]'>
          <Wallets />
        </div>
        <div className='basis-[30%]'>
          <PNLAnalysis />
        </div>
      </div>

      {/* <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6'>
        <div className='w-full '>
          <div className='w-full  bg-white rounded-lg shadow p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
              <h2 className='text-xl font-bold mb-2 sm:mb-0'>Portfolio</h2>
              <div className='flex border border-[#32405433] h-[30px] w-full sm:w-[194px]'>
                <button className='bg-transparent text-xs text-black focus:bg-[#B0D6F5] w-full hover:border-[#B0D6F5] p-0 rounded-none'>
                  All Asset
                </button>
                <button className='bg-[#32405433] w-full text-black text-xs p-0 rounded-none focus:bg-[#B0D6F5] hover:border-[#B0D6F5]'>
                  Watchlist
                </button>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='text-left text-gray-600'>
                    <th>Asset</th>
                    <th>Balance</th>
                    <th>Buy Price</th>
                    <th>Profit</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='py-2 flex items-center gap-2'>
                        <div>
                          <img
                            src={`/images/${item.asset.toLowerCase()}.png`}
                            alt={item.asset}
                          />
                        </div>
                        <div className='text-black'>{item.asset}</div>
                        <div className='text-sm text-gray-500'>
                          {item.symbol}
                        </div>
                      </td>
                      <td className='text-black'>{item.balance}</td>
                      <td className='text-black'>{item.buyPrice}</td>
                      <td className='text-green-500'>{item.profit}</td>
                      <td className='text-black'>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className='text-xl font-bold mb-4'>Price Chart</h2>
          <CandleStick />
        </div>
      </div> */}

      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6'>
        <div className='w-full  bg-white rounded-lg shadow p-4 sm:p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold text-black'>Latest Blocks</h2>
            <button className='border border-[#B0D6F599] bg-transparent text-[#32405499] text-sm px-2 py-1 rounded'>
              View All
            </button>
          </div>
          {latestBlocks.map((block, index) => (
            <div key={index} className='border-b py-2'>
              <div className='flex gap-6'>
                <div>
                  <img src='/images/frame.png' alt='Frame' />
                </div>
                <div className='flex flex-col w-full gap-3'>
                  <div className='flex justify-between w-full items-center'>
                    <span className='font-bold text-gray-500'>
                      {block.block}
                    </span>
                    <span className='text-gray-500 text-[11px]'>
                      {block.time}
                    </span>
                  </div>
                  <div className='text-sm text-gray-600'>
                    Transactions: {block.transactions}
                  </div>
                  <div className='text-sm text-gray-500 truncate'>
                    {block.hash}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full sm:w-1/3 border-[#32405433] border-2 rounded-[12px] p-4 '>
          <h2 className='text-xl font-bold mb-4 text-black'>Watchlist</h2>
          <div className='flex flex-col justify-between h-[90%]'>
            <div>
              {assets.map((asset) => (
                <div
                  key={asset.name}
                  className='flex items-center justify-between mb-3'
                >
                  <div className='flex items-center'>
                    {/* <asset.icon className='w-6 h-6 mr-2 text-black' /> */}
                    <span className='font-medium text-black'>{asset.name}</span>
                  </div>
                  <div className='text-right'>
                    <div className='font-bold'>{asset.price}</div>
                    <div
                      className={
                        asset.change.startsWith('+')
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {asset.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4'>
              <p className='text-sm text-[#32405499]'>
                Top Picks for Your Crypto Watchlist: Web3 & Solana Projects to
                Follow
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className=' flex justify-center  flex-col'>
        <div className='flex'>
          <div className='basis-[70%]'>
            <RegisteredUsers />
          </div>
          <div className='basis-[30%]'>
            <WalletDetails />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Wallet;
