import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faAddressCard,
  faChartLine,
  faCoins,
  faLink,
  faDollarSign,
  faWater,
  faChartBar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useCreateBuy } from '../../libs/builder/user/mutations';

import TradeConfirmation from '../TradeConfirmation';

function Message({
  message,
  isHistory,
  isLoading,
  isError,
  sendMessage,
  userId,
  chatId,
}) {
  const isUser = message?.role === 'user';
  const isDataUrl = (str) => str && str.startsWith('data:');
  const {
    mutate: createBuy,
    data: createBuyData,
    isLoading: isBuyLoading,
    isError: isBuyError,
    isSuccess: isBuySuccess,
  } = useCreateBuy();

  console.log(userId, createBuyData?.data.success);
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return format(new Date(timestamp), 'MMM d, yyyy HH:mm');
  };

  const renderAudioResponse = (content) => {
    try {
      const data = JSON.parse(content);
      return (
        <div className='overflow-x-auto bg-transparent'>
          <table className='min-w-full '>
            <thead>
              <tr className=''>
                <th className='px-4 py-2 text-left font-semibold'>
                  <FontAwesomeIcon icon={faUser} className='mr-2' />
                  Name
                </th>
                <th className='px-4 py-2 text-left font-semibold'>
                  <FontAwesomeIcon icon={faAddressCard} className='mr-2' />
                  Address
                </th>
                <th className='px-4 py-2 text-right font-semibold'>
                  <FontAwesomeIcon icon={faChartLine} className='mr-2' />
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? ' bg-black/5' : ' bg-black/10'}
                >
                  <td className='px-4 py-2'>{item.name}</td>
                  <td className='px-4 py-2 font-mono text-sm'>
                    {item.address}
                  </td>
                  <td className='px-4 py-2 text-right'>
                    ${item.mcap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } catch (error) {
      return <p>{content}</p>;
    }
  };

  const footerMessage = (data) => {
    return (
      <div className='mt-2 text-sm'>
        <p className='flex items-center'>
          <FontAwesomeIcon icon={faCoins} className='mr-2 text-yellow-500' />
          <span>
            <em>Token focus for this chat has been changed to: </em>
            <strong className='ml-1'>{data.name}</strong>
          </span>
        </p>
      </div>
    );
  };

  const renderAdditionalData = (data) => {
    return (
      <div className='mt-2 text-sm grid grid-cols-2 gap-2'>
        <p>
          <FontAwesomeIcon icon={faCoins} className='mr-2' />
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <FontAwesomeIcon icon={faLink} className='mr-2' />
          <strong>Chain:</strong> {data.chain}
        </p>
        <p>
          <FontAwesomeIcon icon={faDollarSign} className='mr-2' />
          <strong>Price:</strong> ${data.price.toFixed(6)}
        </p>
        <p>
          <FontAwesomeIcon icon={faChartLine} className='mr-2' />
          <strong>Market Cap:</strong> ${data.mc.toLocaleString()}
        </p>
        <p>
          <FontAwesomeIcon icon={faWater} className='mr-2' />
          <strong>Liquidity:</strong> ${data.liquidity.toLocaleString()}
        </p>
        <p>
          <FontAwesomeIcon icon={faChartBar} className='mr-2' />
          <strong>1h Change:</strong> {data.oneHour.toFixed(2)}%
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} className='mr-2' />
          <strong>24h Change:</strong> {data.twentyFourHour.toFixed(2)}%
        </p>
      </div>
    );
  };
  

  const renderTradeData = (tradeData) => {
    if (!tradeData) return null;

    const { type, amount, name, address } = tradeData;
    const typeSymbol = type === 'buy' ? '$' : '%';
    const [response, setResponse] = useState(null);

    const handleResponse = (answer) => {
      sendMessage(answer);
      setResponse(answer);

      if (answer === 'Yes') {
        createBuy({
          amount,
          userId,
          address,
          name,
        });
      }
    };

    return (
      <div className='mt-4 p-4 bg-gray-100 rounded-lg shadow-md'>
        <p className='flex items-center text-lg mb-3'>
          <FontAwesomeIcon
            icon={faExchangeAlt}
            className='mr-3 text-green-500'
          />
          <span>
            Are you sure you want to{' '}
            <strong className='text-blue-600'>{type}</strong>{' '}
            <strong className='text-green-600'>
              {amount}
              {typeSymbol}
            </strong>{' '}
            of <strong className='text-purple-600'>{name}</strong>?
          </span>
        </p>
        <p className='mb-3 text-sm'>
          Address:{' '}
          <span className='font-mono bg-gray-200 p-1 rounded'>{address}</span>
        </p>
        {response === null ? (
          <div className='flex justify-center space-x-4'>
            <button
              onClick={() => handleResponse('Yes')}
              className='bg-[#0463CA] text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300'
            >
              Yes
            </button>
            <button
              onClick={() => handleResponse('No')}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
            >
              No
            </button>
          </div>
        ) : (
          <div>
            <p className='text-center font-semibold mb-2'>
              You responded: <span className='text-blue-600'>{response}</span>
            </p>
            {isBuyLoading && (
              <p className='text-center text-gray-600'>
                Processing your buy request...
              </p>
            )}
            {isBuyError && (
              <p className='text-center text-red-600'>
                Error processing your buy request. Please try again.
              </p>
            )}
            {isBuySuccess &&
              createBuyData &&
              createBuyData.data &&
              createBuyData.data.data &&
              createBuyData.data.data.success && (
                <div className='text-center'>
                  <p className='text-green-600 mb-2'>
                    {createBuyData.data.message}
                  </p>
                  <p className='font-semibold'>Transaction Hash URL:</p>
                  <a
                    href={createBuyData.data.data.hashUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline break-all'
                  >
                    {createBuyData.data.data.hashUrl}
                  </a>
                </div>
              )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`py-2 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-[#B0D6F566] text-black border border-[#0487E2]'
            : 'bg-[#0463CA] text-white'
        } ${isHistory ? 'opacity-70' : ''}`}
      >
        <div className='mb-2'>
          {message.data && renderAdditionalData(message.data)}
        </div>
        {isDataUrl(message?.content) ? (
          message.content.startsWith('data:image/') ? (
            <img
              src={message.content}
              alt='Uploaded'
              className='max-w-[200px] max-h-[200px] w-auto h-auto object-cover rounded'
            />
          ) : message.content.startsWith('data:audio/') ? (
            <audio
              controls
              src={message.content}
              className='max-w-full w-[200px]'
            />
          ) : (
            <p>{message?.content}</p>
          )
        ) : message?.content?.startsWith('[{') ? (
          renderAudioResponse(message.content)
        ) : (
          <p>{message?.content}</p>
        )}
        <div className='mb-2'>
          {message.data && footerMessage(message.data)}
        </div>

        {/* Add timestamp */}
        <div className='text-xs mt-2 opacity-70'>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>

      {message.tradeData && (
        <TradeConfirmation
          tradeData={message.tradeData}
          userId={userId}
          sendMessage={sendMessage}
          createBuy={createBuy}
          isBuyLoading={isBuyLoading}
          isBuyError={isBuyError}
          isBuySuccess={isBuySuccess}
          createBuyData={createBuyData}
          chatId={chatId}
        />
      )}

      {message.files && message.files.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-2'>
          {message.files.map((file, fileIndex) => (
            <div key={fileIndex} className='max-w-full'>
              {file.type.startsWith('image/') ? (
                <img
                  src={file.content}
                  alt='Uploaded'
                  className='max-w-[200px] max-h-[200px] w-auto h-auto object-cover rounded'
                />
              ) : file.type.startsWith('audio/') ? (
                <audio
                  controls
                  src={file.content}
                  className='max-w-full w-[200px]'
                />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;
