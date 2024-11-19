import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '../component/ui/Card';
import { Skeleton } from '../component/ui/Skeleton';
import ChatInput from '../component/chatInput';
import ChatMessage from '../component/chat';
import {
  useGetUserInfo,
  useGetUserSingleChatWithID,
} from '../libs/builder/user/queries';
import {
  useCreateChat,
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
    <Card className='h-full flex flex-col border-0'>
      <CardContent className='flex-1 p-0'>
        {showSuggestion ? (
          <div className='flex-1 flex justify-center items-center'>
            <SuggestionGrid
              sendMessage={sendMessage}
              selectedSuggestionSet={setSelectedSuggestion}
            />
          </div>
        ) : (
          <div className='flex flex-col h-full'>
            <div className='flex-1 overflow-y-auto relative'>
              <div className='absolute inset-0'>
                <ChatMessage
                  socket={socket}
                  chatData={chatData}
                  chatHistory={getSingleChat}
                  isLoading={isSocketLoading}
                  isError={socketError}
                  sendMessage={sendMessage}
                  userId={userId}
                  chatId={currentChatId}
                />
              </div>
            </div>
            <div className='p-4 border-t'>
              <ChatInput sendMessage={sendMessage} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
