'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

// Utility function to merge class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Button component
const Button = React.forwardRef(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          variant === 'default'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-input hover:bg-accent hover:text-accent-foreground',
          'h-10 py-2 px-4',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Card components
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

const CardContent = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = ({ className, ...props }) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

// Main component
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
        });
      } catch (error) {
        console.error('Buy error:', error);
        setIsLoading(false);
        setStatus('error');
      }
    } else {
      setStatus('idle');
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center justify-center text-2xl font-bold'>
          <LucideIcons.ArrowRightLeft className='mr-2 text-primary' />
          Trade Confirmation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode='wait'>
          {status === 'idle' && (
            <motion.div
              key='prompt'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className='text-center text-lg mb-4'>
                Are you sure you want to{' '}
                <span className='font-semibold text-primary'>{type}</span>{' '}
                <span className='font-semibold text-green-600'>
                  {amount}
                  {typeSymbol}
                </span>{' '}
                of <span className='font-semibold text-secondary'>{name}</span>?
              </p>
              <p className='text-sm bg-gray-100 p-3 rounded-lg mb-4'>
                Address:{' '}
                <span className='font-mono bg-gray-200 p-1 rounded text-xs'>
                  {address}
                </span>
              </p>
            </motion.div>
          )}
          {status === 'loading' && (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex justify-center items-center space-x-2'
            >
              <LucideIcons.Loader2 className='animate-spin' />
              <p>Processing your {type} request...</p>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              key='success'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='text-center space-y-2'
            >
              <LucideIcons.CheckCircle
                className='mx-auto text-green-500'
                size={48}
              />
              <p className='text-green-600 font-semibold text-lg'>
                {type.charAt(0).toUpperCase() + type.slice(1)} successful!
              </p>
              <p className='font-semibold'>Transaction Hash:</p>
              <a
                href={transactionHash || '#'}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline break-all bg-gray-100 p-2 rounded-lg block transition duration-300 hover:bg-gray-200'
              >
                {transactionHash}
              </a>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              key='error'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='text-center space-y-2'
            >
              <LucideIcons.XCircle className='mx-auto text-red-500' size={48} />
              <p className='text-red-600 font-semibold'>
                Error processing your {type} request. Please try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      {status === 'idle' && (
        <CardFooter className='flex justify-center space-x-4'>
          <Button onClick={() => handleResponse('Yes')} disabled={isLoading}>
            Yes, I'm sure
          </Button>
          <Button
            onClick={() => handleResponse('No')}
            variant='outline'
            disabled={isBuyLoading}
          >
            No, cancel
          </Button>
        </CardFooter>
      )}
      {(status === 'error' || status === 'success') && (
        <CardFooter className='flex justify-center'>
          <Button onClick={() => setStatus('idle')} variant='outline'>
            Close
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
