import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

const CryptoItem = ({ name, address, mcap, count }) => {
  return (
    <li className='relative' data-testid='crypto-item'>
      <div className='group relative flex items-center justify-between rounded-lg hover:bg-yellow-50'>
        <div className='flex-grow flex flex-col p-2 overflow-hidden '>
          <div className='flex justify-between items-center'>
            <span className='text-black text-sm font-semibold'>
              {name || 'Unknown'}
            </span>
            {count > 1 && (
              <span className='text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full'>
                x{count}
              </span>
            )}
          </div>
          <div className='text-gray-600 text-xs truncate'>{address}</div>
          {mcap && (
            <div className='text-green-600 text-xs'>
              Market Cap: $
              {mcap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          )}
        </div>
        <button
          className='flex items-center justify-center p-2 text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-gray-600'
          aria-label='Crypto options'
        >
          <MoreVertical className='h-4 w-4' />
        </button>
      </div>
    </li>
  );
};

const CryptoSection = ({ title, cryptos, isOpen, onToggle }) => {
  return (
    <div className='relative mt-5 first:mt-0 last:mb-5'>
      <div className='sticky top-0 z-20 bg-yellow-200'>
        <button
          className='flex h-9 w-full items-center px-2 text-xs font-semibold text-black'
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className='flex-grow text-left text-sm'>{title}</span>
          {isOpen ? (
            <ChevronUp className='h-4 w-4' />
          ) : (
            <ChevronDown className='h-4 w-4' />
          )}
        </button>
      </div>
      {isOpen && (
        <ol className='space-y-2'>
          {cryptos.map((crypto, index) => (
            <CryptoItem key={index} {...crypto} />
          ))}
        </ol>
      )}
    </div>
  );
};

export default function ChatHistorySection({ chatHistory }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const groupedCryptoData = useMemo(() => {
    const groupedData = {};

    // Check if chatHistory is defined and is an array
    if (Array.isArray(chatHistory)) {
      chatHistory.forEach((crypto) => {
        if (groupedData[crypto.address]) {
          groupedData[crypto.address].count += 1;
          // Update mcap if it exists and is higher
          if (
            crypto.mcap &&
            (!groupedData[crypto.address].mcap ||
              crypto.mcap > groupedData[crypto.address].mcap)
          ) {
            // Fixed condition to check if mcap is higher
            groupedData[crypto.address].mcap = crypto.mcap;
          }
        } else {
          groupedData[crypto.address] = {
            ...crypto,
            count: 1,
          };
        }
      });
    }

    return Object.values(groupedData);
  }, [chatHistory]);

  return (
    <div className='flex h-full w-full max-w-xs flex-col rounded-md overflow-y-auto bg-[#FFFDD2] shadow-lg p-2 custom-scrollbar scrollbar-hide'>
      <div className='flex-grow overflow-y-auto p-2 scrollbar-hide'>
        <CryptoSection
          title='History List'
          cryptos={groupedCryptoData}
          isOpen={isOpen}
          onToggle={toggleSection}
        />
      </div>
    </div>
  );
}
