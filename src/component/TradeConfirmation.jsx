import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ArrowRightLeft,
  Loader2,
  CheckCircle,
  ExternalLink,
  Copy,
  AlertCircle,
} from 'lucide-react';

export default function TradeConfirmation({
  tradeData,
  userId,
  sendMessage,
  createBuy,
  isBuyLoading,
  isBuyError,
  isBuySuccess,
  createBuyData,
  chatId,
}) {
  const [status, setStatus] = useState('idle');
  const [transactionHash, setTransactionHash] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isBuyLoading) {
      setStatus('loading');
      setIsLoading(true);
    } else if (isBuyError) {
      setStatus('error');
      setIsLoading(false);
    } else if (isBuySuccess) {
      setStatus('success');
      setTransactionHash(createBuyData?.data?.data?.hashUrl);
      setIsLoading(false);
    }
  }, [isBuyLoading, isBuyError, isBuySuccess, createBuyData]);

  if (!tradeData) return null;

  const { type, amount, name, address } = tradeData;
  const typeSymbol = type === 'buy' ? '$' : '%';

  const handleResponse = async (answer) => {
    sendMessage(answer);

    if (answer === 'Yes') {
      setIsLoading(true);
      try {
        await createBuy({
          amount,
          userId,
          address,
          name,
          chatId,
          cancelled: false,
        });
      } catch (error) {
        console.error('Buy error:', error);
        setIsLoading(false);
        setStatus('error');
      }
    } else {
      try {
        await createBuy({
          cancel: true,
        });
      } catch (error) {
        console.error('Cancel error:', error);
      }
      setStatus('idle');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto border-2 border-muted'>
      <CardHeader className='space-y-1'>
        <CardTitle className='flex items-center justify-center gap-2'>
          <ArrowRightLeft className='h-5 w-5 text-primary' />
          <span>Trade Confirmation</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode='wait'>
          {status === 'idle' && (
            <motion.div
              key='prompt'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='space-y-4'
            >
              <div className='text-center space-y-2'>
                <p className='text-lg'>
                  Are you sure you want to{' '}
                  <Badge variant={type === 'buy' ? 'default' : 'secondary'}>
                    {type}
                  </Badge>{' '}
                  <Badge variant='success' className='font-mono'>
                    {amount}
                    {typeSymbol}
                  </Badge>{' '}
                  of{' '}
                  <Badge variant='outline' className='font-semibold'>
                    {name}
                  </Badge>
                  ?
                </p>
              </div>

              <div className='bg-muted p-3 rounded-lg space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Address:
                  </span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 px-2'
                    onClick={() => copyToClipboard(address)}
                  >
                    {copied ? (
                      <CheckCircle className='h-4 w-4' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                </div>
                <code className='block w-full font-mono text-xs bg-background p-2 rounded'>
                  {address}
                </code>
              </div>
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col items-center justify-center gap-4 py-8'
            >
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
              <p className='text-muted-foreground'>
                Processing your {type} request...
              </p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='space-y-4 text-center py-4'
            >
              <CheckCircle className='h-12 w-12 text-green-500 mx-auto' />
              <div className='space-y-2'>
                <p className='text-lg font-medium text-green-600'>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Successful!
                </p>
                <p className='text-sm text-muted-foreground'>
                  Your transaction has been confirmed
                </p>
              </div>

              <div className='bg-muted p-4 rounded-lg space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Transaction Hash</span>
                  <div className='space-x-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 px-2'
                      onClick={() => copyToClipboard(transactionHash)}
                    >
                      {copied ? (
                        <CheckCircle className='h-4 w-4' />
                      ) : (
                        <Copy className='h-4 w-4' />
                      )}
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 px-2'
                      asChild
                    >
                      <a
                        href={transactionHash}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    </Button>
                  </div>
                </div>
                <code className='block w-full font-mono text-xs bg-background p-2 rounded break-all'>
                  {transactionHash}
                </code>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key='error'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col items-center justify-center gap-4 py-8'
            >
              <div className='rounded-full bg-red-100 p-3'>
                <AlertCircle className='h-6 w-6 text-red-600' />
              </div>
              <div className='text-center space-y-2'>
                <p className='text-lg font-medium text-red-600'>
                  Transaction Failed
                </p>
                <p className='text-sm text-muted-foreground'>
                  Error processing your {type} request. Please try again.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className='flex justify-center gap-3'>
        {status === 'idle' ? (
          <>
            <Button
              onClick={() => handleResponse('Yes')}
              disabled={isLoading}
              className='w-32'
            >
              {isLoading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                "Yes, I'm sure"
              )}
            </Button>
            <Button
              onClick={() => handleResponse('No')}
              variant='outline'
              disabled={isLoading}
              className='w-32'
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setStatus('idle')}
            variant='outline'
            className='w-32'
          >
            Close
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
