// import { useCallback, useEffect, useState } from 'react';
// import ChatInput from '../component/chatInput';
// import ChatMessage from '../component/chat';
// import {
//   useGetUserInfo,
//   useGetUserSingleChat,
//   useGetUserSingleChatWithID,
// } from '../libs/builder/user/queries';
// import { useCreateChat, useDeleteChat } from '../libs/builder/user/mutations';
// import { io } from 'socket.io-client';
// import SuggestionGrid from '../component/ui/SuggestionGrid';
// import { ChatHistorySidebar } from '../component/ui/ChatHistorySection';

// export default function Chat() {
//   const [chatData, setChatData] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { data: userInfo } = useGetUserInfo();
//   const userId = userInfo?.data?.userInfo?.id;
//   const { mutate: createChat, data: createChatData } = useCreateChat();
//   const { data: getchats } = useGetUserSingleChat(userId);
//   const { data: getSingleChat } = useGetUserSingleChatWithID(currentChatId);
//   const { mutate: deleteChat } = useDeleteChat();

//   console.log({ currentChatId, getSingleChat });

//   useEffect(() => {
//     const savedChatId = localStorage.getItem('currentChatId');
//     if (savedChatId) {
//       setCurrentChatId(savedChatId);
//     } else if (userId) {
//       createChat({ userId });
//     }

//     const newSocket = io('https://api.chattatrader.com');
//     newSocket.on('connect', () => {
//       console.log('Connected to socket server');
//       setSocket(newSocket);
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//     });

//     return () => {
//       if (newSocket) newSocket.disconnect();
//     };
//   }, [userId, createChat]);

//   useEffect(() => {
//     if (createChatData) {
//       const newChatId = createChatData.data.data.chatId;
//       setCurrentChatId(newChatId);
//       localStorage.setItem('currentChatId', newChatId);
//     }
//   }, [createChatData]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleResponse = (data) => {
//       console.log(data);
//       setChatData((prevData) => [...prevData, data]);
//     };

//     socket.on('response', handleResponse);

//     return () => {
//       socket.off('response', handleResponse);
//     };
//   }, [socket]);

//   return (
//     <div className='h-full flex flex-col'>
//       {chatData.length === 0 ? (
//         <div className='flex-1 flex justify-center items-center'>
//           <SuggestionGrid />
//         </div>
//       ) : (
//         <div className='flex-1 overflow-y-auto py-4 px-4 sm:px-6 lg:px-8'>
//           <ChatMessage chatData={chatData} message={getchats} />
//           {loading && (
//             <div className='flex justify-center items-center p-4'>
//               <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
//             </div>
//           )}
//         </div>
//       )}
//       <div className='py-4 px-4 sm:px-6 lg:px-8'>
//         <ChatInput sendMessage={sendMessage} />
//       </div>
//     </div>
//   );
// }

import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ChatInput from '../component/chatInput';
import ChatMessage from '../component/chat';
import {
  useGetUserInfo,
  useGetUserSingleChat,
  useGetUserSingleChatWithID,
} from '../libs/builder/user/queries';
import {
  useCreateBuy,
  useCreateChat,
  useDeleteChat,
  useSocketConnection,
} from '../libs/builder/user/mutations';
import SuggestionGrid from '../component/ui/SuggestionGrid';

export default function Chat() {
  const [chatData, setChatData] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSuggestion, setSelectedSuggestion] = useState(true);
  const queryClient = useQueryClient();
  const { data: userInfo } = useGetUserInfo();
  const userId = userInfo?.data?.userInfo?.id;
  const { mutate: createChat, data: createChatData } = useCreateChat();
  const { data: getSingleChat } = useGetUserSingleChatWithID(currentChatId);
  // const { mutate: deleteChat } = useDeleteChat();
  const {
    data: socket,
    isLoading: isSocketLoading,
    error: socketError,
  } = useSocketConnection();

  useEffect(() => {
    const savedChatId = localStorage.getItem('currentChatId');
    if (savedChatId) {
      setCurrentChatId(savedChatId);
    } else if (userId) {
      createChat({ userId });
    }
  }, [userId, createChat]);

  useEffect(() => {
    if (createChatData) {
      const newChatId = createChatData.data.data.chatId;
      setCurrentChatId(newChatId);
      localStorage.setItem('currentChatId', newChatId);
    }
  }, [createChatData]);

  useEffect(() => {
    if (!socket) return;

    const handleResponse = (data) => {
      console.log(data);
      setChatData((prevData) => [...prevData, data]);
      queryClient.invalidateQueries(['userSingleChatWithID', currentChatId]);
    };

    socket.on('response', handleResponse);

    return () => {
      socket.off('response', handleResponse);
    };
  }, [socket, currentChatId, queryClient]);

  const sendMessage = useCallback(
    (content, files = []) => {
      if ((!content && files.length === 0) || !socket || !currentChatId) return;

      const messageData = {
        chatId: currentChatId,
        content: content || '',
        timestamp: new Date().toISOString(),
        role: 'user',
      };

      const processFiles = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              type: file.type,
              content: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(processFiles).then((processedFiles) => {
        let fullMessageData = { ...messageData };

        if (processedFiles.length > 0) {
          const file = processedFiles[0];
          if (
            file.type.startsWith('image/') ||
            file.type.startsWith('audio/')
          ) {
            fullMessageData.content = file.content;
          } else {
            fullMessageData.files = processedFiles;
          }
        }

        setSelectedSuggestion(false);
        if (processedFiles.some((file) => file.type.startsWith('image/'))) {
          socket.emit('photo', JSON.stringify(fullMessageData));
        } else if (
          processedFiles.some((file) => file.type.startsWith('audio/'))
        ) {
          socket.emit('audio', JSON.stringify(fullMessageData));
        } else {
          socket.emit('message', JSON.stringify(fullMessageData));
        }

        setChatData((prevData) => [...prevData, fullMessageData]);
      });
    },

    [socket, currentChatId]
  );

  return (
    <div className='h-full flex flex-col'>
      {showSuggestion ? (
        <div className='flex-1 flex justify-center items-center'>
          <SuggestionGrid
            sendMessage={sendMessage}
            selectedSuggestionSet={setSelectedSuggestion}
          />
        </div>
      ) : (
        <div className='flex-1 overflow-y-auto py-4 px-4 sm:px-6 lg:px-8'>
          <ChatMessage
            chatData={chatData}
            chatHistory={getSingleChat}
            isLoading={isSocketLoading}
            isError={socketError}
            sendMessage={sendMessage}
            userId={userId}
            chatId={currentChatId}
          />
          {isSocketLoading && (
            <div className='flex justify-center items-center p-4'>
              <svg
                stroke='currentColor'
                fill='none'
                strokeWidth='2'
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='animate-spin text-center'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <line x1='12' y1='2' x2='12' y2='6'></line>
                <line x1='12' y1='18' x2='12' y2='22'></line>
                <line x1='4.93' y1='4.93' x2='7.76' y2='7.76'></line>
                <line x1='16.24' y1='16.24' x2='19.07' y2='19.07'></line>
                <line x1='2' y1='12' x2='6' y2='12'></line>
                <line x1='18' y1='12' x2='22' y2='12'></line>
                <line x1='4.93' y1='19.07' x2='7.76' y2='16.24'></line>
                <line x1='16.24' y1='7.76' x2='19.07' y2='4.93'></line>
              </svg>
            </div>
          )}
        </div>
      )}
      <div className=' px-4 sm:px-6 lg:px-8'>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
