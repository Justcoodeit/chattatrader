import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { ScrollArea } from '../ui/scroll-area';
import { AlertCircle, Bot, ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import Message from '../message';

function ChatMessage({
  chatData,
  chatHistory,
  isLoading,
  isError,
  sendMessage,
  userId,
  chatId,
  socket,
}) {
  const ongoingMessages = chatData || [];
  const chatEndRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ongoingMessages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const LoadingSkeleton = () => (
    <div className='space-y-6'>
      {[...Array(3)].map((_, i) => (
        <div key={i} className='flex items-start gap-3 mx-4'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-16 w-[250px]' />
            <Skeleton className='h-4 w-[100px]' />
          </div>
        </div>
      ))}
    </div>
  );

  const ErrorMessage = () => (
    <Card className='mx-auto max-w-md bg-destructive/10 border-destructive'>
      <CardContent className='flex items-center p-4'>
        <AlertCircle className='h-5 w-5 text-destructive mr-2 shrink-0' />
        <p className='text-sm text-destructive'>
          An unexpected error occurred. Please try again later.
        </p>
      </CardContent>
    </Card>
  );

  const NoMessagesPlaceholder = () => (
    <div className='flex flex-col items-center justify-center h-full space-y-4 text-center p-8'>
      <div className='rounded-full bg-primary/10 p-4'>
        <Bot className='h-8 w-8 text-primary' />
      </div>
      <div className='space-y-2'>
        <h3 className='font-semibold text-xl'>Welcome to ChattaTrader</h3>
        <p className='text-muted-foreground text-sm max-w-sm'>
          Start your conversation by sending a message. Ask about market
          analysis, trading strategies, or get real-time token information.
        </p>
      </div>
    </div>
  );

  return (
    <div className='relative flex flex-col h-full'>
      <ScrollArea ref={scrollAreaRef} className='flex-1 py-4' type='hover'>
        {isLoading ? (
          <LoadingSkeleton />
        ) : ongoingMessages.length === 0 ? (
          <NoMessagesPlaceholder />
        ) : (
          <div className='space-y-6'>
            {ongoingMessages.map((message, index) => (
              <Message
                key={`ongoing-${index}`}
                message={message}
                isHistory={false}
                isLoading={isLoading}
                sendMessage={sendMessage}
                userId={userId}
                chatId={chatId}
                socket={socket}
              />
            ))}
            <div ref={chatEndRef} />
          </div>
        )}

        {isError && <ErrorMessage />}
      </ScrollArea>

      {showScrollButton && (
        <Button
          variant='outline'
          size='icon'
          className='absolute bottom-4 right-4 rounded-full shadow-lg'
          onClick={scrollToBottom}
        >
          <ArrowDown className='h-4 w-4' />
        </Button>
      )}

      {/* Message Status Indicator */}
      <div className='absolute bottom-0 left-0 right-0 h-1'>
        {isLoading && (
          <div className='h-full bg-primary/10 animate-pulse rounded-full' />
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
