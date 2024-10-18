import ReactApexChart from 'react-apexcharts';
import CandleStick from '../component/CandleStick';

function BuyAndSell() { 
  // Dummy data for the line chart
  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 160,
      toolbar: { show: false },
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { type: 'datetime' },
    yaxis: { show: false },
    tooltip: { enabled: false },
    grid: { show: false },
  };

  const lineChartSeries = [
    {
      data: [
        [1617235200000, 33.22],
        [1617321600000, 34.0],
        [1617408000000, 33.5],
        [1617494400000, 34.2],
        [1617580800000, 35.1],
      ],
    },
  ];

  // Dummy data for market coins
  const marketCoins = [
    { name: 'Solana', symbol: 'SOL', price: '12,563.78', change: '3.7' },
    { name: 'Bitcoin', symbol: 'BTC', price: '42,563.78', change: '2.1' },
    { name: 'Sofiatx', symbol: 'CHSB', price: '0.563', change: '-1.2' },
    { name: 'Solana', symbol: 'ETH', price: '3,263.78', change: '1.5' },
    { name: 'Solana', symbol: 'ADA', price: '1.23', change: '0.8' },
    { name: 'Solana', symbol: 'DOGE', price: '0.163', change: '-2.3' },
  ];

  return (
    <div className='flex flex-col p-4 '>
      {/* Header */}
      <div
        className='w-full p-6 mb-6 text-white h-[150px] rounded-lg'
        style={{
          background:
            'linear-gradient(90deg, #0463CA 0%, #5A9DE6 51.5%, #247EDF 100%)',
        }}
      >
        <h1 className='text-2xl font-bold mb-2'>
          Secure Your Solana Transactions with XYZ Company
        </h1>
        <p>
          Fast, Low-Cost, and Secure Transactions Powered by Solana Blockchain.
          Track and Manage Your Orders with Ease.
        </p>
      </div>
      {/* Main content */}
      <div className='flex flex-wrap flex-row-reverse'>
        {/* Chart */}
        <div className='w-full lg:w-2/3 p-4'>
          <CandleStick />
        </div>

        {/* Buy and Sell */}
        <div className='w-full lg:w-1/3 p-4'>
          <div className='bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Your Wallet</h2>
            <div className='flex  mb-4'>
              <button className='bg-transparent  text-[#32405499] px-4 py-2 rounded  focus:bg-[#B0D6F5] hover:border-[#B0D6F5]'>
                Buy
              </button>
              <button className='bg-transparent text-[#32405499] px-4 py-2  rounded  focus:bg-[#B0D6F5] hover:border-[#B0D6F5]'>
                Sell
              </button>
              <button className=' text-[#32405499] px-4 py-2 rounded bg-transparent focus:bg-[#B0D6F5] hover:border-[#B0D6F5]'>
                Exchange
              </button>
            </div>
            <div className='mb-4'>
              <p>Your pay</p>
              <button className='w-full flex justify-between items-center bg-white p-2 rounded border'>
                <span className='text-lg font-semibold'>Solana</span>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
            </div>
            <div className='mb-4 flex justify-between'>
              <div className='flex justify-between items-center'>
                <span className='text-xm font-bold text-[#32405499]'>
                  -$965,786.12
                </span>
              </div>
              <div className=' text-xs text-[#32405499]'>
                Balance: 145 <span className='text-blue-600'>MAX</span>
              </div>
            </div>
            <p> Enter Amount</p>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Enter Amount'
                className='w-full p-2 border rounded'
                value='$1,200.00'
              />
            </div>

            <div className='mb-4 flex justify-between'>
              <div className='flex justify-between items-center'>
                <span className='text-xm font-bold text-[#32405499]'>
                  -$965,786.12
                </span>
              </div>
              <div className=' text-xs text-[#32405499]'>
                Balance: 145 <span className='text-blue-600'>MAX</span>
              </div>
            </div>
            <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4'>
              Connect
            </button>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Summary</h3>
              <div className='flex justify-between'>
                <span>Entry price</span>
                <span>750.00 SOL</span>
              </div>
              <div className='flex justify-between'>
                <span>Trading Fee</span>
                <span>1,665.0789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Market section */}

      <div className='w-full p-6 border border-[#32405433] rounded-lg'>
        <div className='flex justify-between mb-4'>
          <h2 className='text-2xl font-bold mb-4'>Market</h2>
          <button className='bg-[#B0D6F599] text-[#32405499] px-4 py-2 rounded-lg text-sm hover:bg-[#B0D6F5] hover:font-semibold transition duration-300'>
            See more
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {marketCoins.map((coin, index) => (
            <div
              key={index}
              className='bg-white border border-[#32405433] shadow-md rounded-2xl p-6 flex flex-col space-y-4'
            >
              <div className='flex items-center space-x-4'>
                <img
                  src={`/images/${coin.name.toLowerCase()}.png`}
                  alt={coin.name}
                  className='w-12 h-12 object-contain'
                />
                <div>
                  <h4 className='font-bold text-lg'>{coin.name}</h4>
                  <p className='text-gray-500 text-sm'>{coin.symbol}</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <p className='font-bold text-xl'>${coin.price}</p>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    coin.change.startsWith('-')
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {coin.change}%
                </div>
              </div>
              <div className='w-full h-20'>
                <ReactApexChart
                  options={{
                    ...lineChartOptions,
                    colors: [
                      coin.change.startsWith('-') ? '#EF4444' : '#10B981',
                    ],
                  }}
                  series={lineChartSeries}
                  type='line'
                  height={80}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyAndSell;
