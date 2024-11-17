import { format } from 'date-fns';
import { Card, CardContent } from '../ui/Card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/ avatar';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {
  User,
  Bot,
  CreditCard,
  TrendingUp,
  Coins,
  Link as LinkIcon,
  DollarSign,
  Droplets,
  BarChart,
  Clock,
  ArrowRightLeft,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
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
  console.log(message);
  const isDataUrl = (str) => str && str.startsWith('data:');
  const {
    mutate: createBuy,
    data: createBuyData,
    isLoading: isBuyLoading,
    isError: isBuyError,
    isSuccess: isBuySuccess,
  } = useCreateBuy();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return format(new Date(timestamp), 'MMM d, yyyy HH:mm');
  };

  const renderAudioResponse = (content) => {
    try {
      const data = JSON.parse(content);
      return (
        <Card className='overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    <User className='inline mr-2 h-4 w-4' />
                    Name
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    <CreditCard className='inline mr-2 h-4 w-4' />
                    Address
                  </th>
                  <th className='px-4 py-3 text-right text-sm font-medium'>
                    <TrendingUp className='inline mr-2 h-4 w-4' />
                    Market Cap
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'transition-colors',
                      index % 2 === 0 ? 'bg-muted/50' : 'bg-background'
                    )}
                  >
                    <td className='px-4 py-2 text-sm'>{item.name}</td>
                    <td className='px-4 py-2 font-mono text-xs'>
                      {item.address}
                    </td>
                    <td className='px-4 py-2 text-sm text-right'>
                      ${item.mcap.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      );
    } catch (error) {
      return <p className='text-sm'>{content}</p>;
    }
  };

  const renderAdditionalData = (data) => {
    const stats = [
      { icon: <Coins className='h-4 w-4' />, label: 'Name', value: data.name },
      {
        icon: <LinkIcon className='h-4 w-4' />,
        label: 'Chain',
        value: data.chain,
      },
      {
        icon: <DollarSign className='h-4 w-4' />,
        label: 'Price',
        value: `$${data.price.toFixed(6)}`,
      },
      {
        icon: <TrendingUp className='h-4 w-4' />,
        label: 'Market Cap',
        value: `$${data.mc.toLocaleString()}`,
      },
      {
        icon: <Droplets className='h-4 w-4' />,
        label: 'Liquidity',
        value: `$${data.liquidity.toLocaleString()}`,
      },
      {
        icon: <BarChart className='h-4 w-4' />,
        label: '1h Change',
        value: `${data.oneHour.toFixed(2)}%`,
      },
      {
        icon: <Clock className='h-4 w-4' />,
        label: '24h Change',
        value: `${data.twentyFourHour.toFixed(2)}%`,
      },
    ];

    return (
      <div className='grid grid-cols-2 gap-3 p-4 bg-muted/50 rounded-lg'>
        {stats.map((stat, index) => (
          <div key={index} className='flex items-center gap-2 text-sm'>
            {stat.icon}
            <span className='font-medium'>{stat.label}:</span>
            <span
              className={cn(
                stat.label.includes('Change') && {
                  'text-green-600': parseFloat(stat.value) > 0,
                  'text-red-600': parseFloat(stat.value) < 0,
                }
              )}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex gap-3 px-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className='h-8 w-8'>
        {isUser ? (
          <>
            <AvatarImage src='/user-avatar.png' />
            <AvatarFallback>U</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src='/bot-avatar.png' />
            <AvatarFallback>
              <Bot className='h-4 w-4' />
            </AvatarFallback>
          </>
        )}
      </Avatar>

      <div
        className={cn(
          'flex flex-col gap-2 max-w-[80%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <Card
          className={cn(
            'shadow-sm',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}
        >
          <CardContent className='p-4'>
            {message.data && renderAdditionalData(message.data)}

            {isDataUrl(message?.content) ? (
              message.content.startsWith('data:image/') ? (
                <img
                  src={message.content}
                  alt='Uploaded content'
                  className='max-w-[300px] rounded-lg shadow-sm'
                />
              ) : message.content.startsWith('data:audio/') ? (
                <div className='p-4 flex items-center justify-center bg-background/50 rounded-lg'>
                  <AudioPlayer
                    src={message.content}
                    autoPlayAfterSrcChange={false}
                    style={{ width: '300px', height: '53px' }}
                    customControlsSection={[
                      'MAIN_CONTROLS',
                      'VOLUME_CONTROLS',
                      // 'PROGRESS_BAR',
                    ]}
                    autoPlay={false}
                    showJumpControls={false}
                    layout='horizontal'
                  />
                </div>
              ) : null
            ) : message?.content?.startsWith('[{') ? (
              renderAudioResponse(message.content)
            ) : (
              <p className='text-sm whitespace-pre-wrap'>{message?.content}</p>
            )}

            {message.data && (
              <Badge variant='secondary' className='mt-2 gap-1'>
                <Coins className='h-3 w-3' />
                Token focus:{' '}
                <span className='font-semibold'>{message.data.name}</span>
              </Badge>
            )}
          </CardContent>
        </Card>

        <span className='text-xs text-muted-foreground px-2'>
          {formatTimestamp(message.timestamp)}
        </span>

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
          <div className='flex flex-wrap gap-2'>
            {message.files.map((file, index) => (
              <Card key={index} className='overflow-hidden'>
                {file.type.startsWith('image/') ? (
                  <img
                    src={file.content}
                    alt='Uploaded'
                    className='max-w-[200px] h-auto object-cover'
                  />
                ) : file.type.startsWith('audio/') ? (
                  <div className='p-4 flex items-center gap-3'>
                    <audio
                      controls
                      src={file.content}
                      className='w-[200px]'
                      preload='metadata'
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
