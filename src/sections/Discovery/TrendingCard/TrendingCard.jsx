const TrendingCard = ({
  rank,
  category,
  blockchain,
  token,
  price,
  users,
  volume,
  topSales,
}) => {
  return (
    <div className='bg-[#008080] text-white p-4 rounded-lg w-[155.5px] h-[73px] flex flex-col justify-start overflow-hidden'>
      <div className='flex items-center justify-between mb-2'>
        <span className='font-bold'>#{rank}</span>
        <span className='text-sm'>{category}</span>
      </div>
      <div className='text-sm mb-1'>{blockchain}</div>
      <div className='text-sm mb-1'>{token}</div>
      <div className='text-sm mb-1'>Price: {price}</div>
      <div className='text-sm mb-1'>Users: {users}</div>
      <div className='text-sm mb-1'>Volume 24hrs: {volume}</div>
      <div className='text-sm mb-2'>Top Sales:</div>
      {topSales.map((sale, index) => (
        <div key={index} className='text-xs flex justify-between'>
          <span>{sale.amount}</span>
          <span>{sale.time}</span>
        </div>
      ))}
    </div>
  );
};

export default TrendingCard;
