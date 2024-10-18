import { useEffect, useRef } from 'react';
import Message from '../message';

import { AlertCircle } from 'lucide-react';

function ChatMessage({
  chatData,
  chatHistory,
  isLoading,
  isError,
  sendMessage,
  userId,
  chatId,
}) {
  const historyMessages = chatHistory?.data?.data?.messages || [];
  const ongoingMessages = chatData || [];
  const chatEndRef = useRef(null); // Create a ref for the chat end

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historyMessages, ongoingMessages]);

  return (
    <div className='flex-1 overflow-y-auto scrollbar-hide w-full space-y-4'>
      {/* Display chat history */}
      {/* {historyMessages.map((message, index) => (
        <Message key={`history-${index}`} message={message} isHistory={true} />
      ))} */}

      {/* Display ongoing chat */}
      {ongoingMessages.map((message, index) => (
        <Message
          key={`ongoing-${index}`}
          message={message}
          isHistory={false}
          isLoading={isLoading}
          isError={isError}
          sendMessage={sendMessage}
          userId={userId}
          chatId={chatId}
        />
      ))}

      {/* Scroll reference for the end of the chat */}
      <div ref={chatEndRef} />

      {/* Display loading or error states */}
      {/* {isLoading && <LoadingIcons/>} */}
      {isError && (
        <div className='relative mx-auto max-w-md mt-4'>
          <div className='absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]' />
          <div className='relative flex items-center p-6 text-sm text-gray-900 rounded-4xl bg-white/80 backdrop-blur-sm'>
            <AlertCircle className='flex-shrink-0 w-6 h-6 mr-3 text-red-600' />
            <div>
              <span className='font-semibold'>Server Error!</span> An unexpected
              error occurred. Please try again later.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
