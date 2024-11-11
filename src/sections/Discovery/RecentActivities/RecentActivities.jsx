import React from 'react';
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';

const ActivityItem = ({ type, status, amount }) => {
  const getIcon = () => {
    switch (type) {
      case 'Withdraw':
        return <FaArrowUp className='text-red-500' />;
      case 'Deposit':
        return <FaArrowDown className='text-green-500' />;
      case 'Transfer':
        return <FaExchangeAlt className='text-blue-500' />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Success':
        return 'text-green-500';
      case 'Pending':
        return 'text-yellow-500';
      case 'Failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className='flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0'>
      <div className='flex items-center'>
        <div className='mr-3'>{getIcon()}</div>
        <div>
          <p className='font-medium'>{type}</p>
          <p className={`text-sm ${getStatusColor()}`}>{status}</p>
        </div>
      </div>
      <p
        className={`font-medium ${
          amount.startsWith('-') ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {amount}
      </p>
    </div>
  );
};

const RecentActivities = () => {
  const activities = [
    { type: 'Withdraw', status: 'Pending', amount: '-421.0USDT' },
    { type: 'Deposit', status: 'Success', amount: '+0.58SOL' },
    { type: 'Transfer', status: 'Failed', amount: '+0.58SOL' },
    { type: 'Deposit', status: 'Success', amount: '+0.58SOL' },
    { type: 'Transfer', status: 'Failed', amount: '+0.58SOL' },
    { type: 'Withdraw', status: 'Success', amount: '-421.00USDT' },
    { type: 'Withdraw', status: 'Success', amount: '-421.00USDT' },
    { type: 'Transfer', status: 'Failed', amount: '+0.58SOL' },
    { type: 'Deposit', status: 'Success', amount: '+0.58SOL' },
    { type: 'Deposit', status: 'Success', amount: '+0.58SOL' },
    { type: 'Withdraw', status: 'Success', amount: '-421.00USDT' },
    { type: 'Transfer', status: 'Failed', amount: '+0.58SOL' },
    { type: 'Deposit', status: 'Success', amount: '+0.58SOL' },
    { type: 'Deposit', status: 'Success', amount: '+0.58SOL' },
  ];

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <div className='flex justify-between items-center '>
        <h2 className='text-xl font-bold text-[#393939]'>Recent Activities</h2>
        <button className='text-[#E6E21A] hover:underline'>View all</button>
      </div>
      <div className='flex justify-between items-center '>
        <h2 className='text-xl font-bold text-[#393939]'>Transaction</h2>
        <button className='text-[#393939]'>Total</button>
      </div>
      <div className='max-h-96 overflow-y-auto'>
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
