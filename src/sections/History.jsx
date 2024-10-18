import { FaSearch } from 'react-icons/fa';

const History = () => {
  const transactions = [
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Bitcoin',
      status: 'Error',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Sofiatx',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'True USDT',
      status: 'Error',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submitting',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submitting',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Submit',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
    {
      type: 'Sent',
      amount: '$1,200',
      paymentMethod: 'Solana',
      status: 'Success',
      activity: 'You sent money to Kris',
      people: 'Darrell Steward',
      date: '10 Feb 2020, 00:00',
    },
  ];

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submit':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'submitting':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='p-6'>
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
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Transaction History</h2>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
          View Full Analytics Report
        </button>
      </div>
      <div className='mb-4 relative'>
        <input
          type='text'
          placeholder='Search transactions...'
          className='w-full px-4 bg-white py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr className='bg-gray-100 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>Type</th>
              <th className='py-3 px-6 text-left'>Amount</th>
              <th className='py-3 px-6 text-left'>Payment Method</th>
              <th className='py-3 px-6 text-left'>Status</th>
              <th className='py-3 px-6 text-left'>Activity</th>
              <th className='py-3 px-6 text-left'>People</th>
              <th className='py-3 px-6 text-left'>Date</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className='border-b border-gray-200 hover:bg-gray-100'
              >
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  {transaction.type}
                </td>
                <td className='py-3 px-6 text-left'>{transaction.amount}</td>
                <td className='py-3 px-6 text-left'>
                  <img
                    src={`/images/${transaction.paymentMethod.toLowerCase()}.png`}
                    alt={transaction.paymentMethod}
                    className='h-6 w-6 inline-block mr-2'
                  />
                  {transaction.paymentMethod}
                </td>
                <td className='py-3 px-6 text-left'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className='py-3 px-6 text-left'>{transaction.activity}</td>
                <td className='py-3 px-6 text-left'>{transaction.people}</td>
                <td className='py-3 px-6 text-left'>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
