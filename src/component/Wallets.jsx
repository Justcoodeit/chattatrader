import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { walletsData } from '../data/WalletsData';

export default function Wallets() {
  const customColors = walletsData.map((entry) => entry.color);

  return (
    <div className='border rounded-md p-2'>
      <div className='w-full bg-[#FFFDD2] text-black text-center p-2 text-xl font-bold mb-4 border rounded-md'>
        <h1>Wallet Usage</h1>
      </div>
      <div className='h-72 flex items-center justify-center mb-6 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={walletsData}
              dataKey='userCount'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius='80%'
              innerRadius='60%'
              labelLine={false}
              paddingAngle={5}
            >
              {walletsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={customColors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Text */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none'>
          <button className='rounded-3xl px-3 py-2 text-sm font-bold border bg-black text-white'>
            Wallet
          </button>
          <div className='text-black text-xl font-bold mt-2'>26</div>
          <div className='text-gray-500 text-sm'>Total Wallets</div>
        </div>
      </div>

      <div className='flex justify-center space-x-16'>
        <div className='flex flex-col space-y-4'>
          {walletsData
            .slice(0, Math.ceil(walletsData.length / 2))
            .map((wallet, index) => (
              <div key={index}>
                <div className='flex items-center'>
                  <div
                    className='w-4 h-4 mr-2 border rounded-2xl'
                    style={{ backgroundColor: wallet.color }}
                  ></div>
                  <p className='font-bold text-sm'>
                    {wallet.name + ':' + ' '}{' '}
                  </p>
                </div>
                <p className='ml-6 text-sm'>{wallet.userCount} </p>
              </div>
            ))}
        </div>
        <div className='flex flex-col space-y-4'>
          {walletsData
            .slice(Math.ceil(walletsData.length / 2))
            .map((wallet, index) => (
              <div key={index}>
                <div className='flex items-center'>
                  <div
                    className='w-4 h-4 mr-2 border rounded-2xl'
                    style={{ backgroundColor: wallet.color }}
                  ></div>
                  <p className='font-bold text-sm'>
                    {wallet.name + ':' + '   '}{' '}
                  </p>
                </div>
                <p className='ml-6 text-sm'>{wallet.userCount} </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
