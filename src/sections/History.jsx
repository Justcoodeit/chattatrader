import { Tabs, TabsContent, TabsList, TabsTrigger } from '../component/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../component/ui/table';
import { Badge } from '../component/ui/badge';
import { format } from 'date-fns';
import {
  useGetUserInfo,
  useGetUserTransactionHistory,
} from '../libs/builder/user/queries';
import { Skeleton } from '../component/ui/Skeleton';
import { data } from 'autoprefixer';

const History = () => {
  const { data: userInfo } = useGetUserInfo();
  const userId = userInfo?.data?.userInfo?.id;
  const { data: historyResponse, isLoading } =
    useGetUserTransactionHistory(userId);
  const history = historyResponse?.data?.data;

  const TableRowSkeleton = () => (
    <TableRow>
      <TableCell>
        <Skeleton className='h-4 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-[120px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-[80px] rounded-full' />
      </TableCell>
      <TableCell className='text-right'>
        <Skeleton className='h-4 w-[100px] ml-auto' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-[90px] rounded-full' />
      </TableCell>
    </TableRow>
  );

  const formatAmount = (amount, direction) => {
    return `${direction === 'in' ? '+' : '-'} ${Math.abs(amount).toFixed(8)}`;
  };

  const getStatusBadge = (status) => {
    const variants = {
      Completed: 'bg-green-100 text-green-800',
      Failed: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const truncateHash = (hash) => {
    if (!hash) return '';
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  return (
    <div className='p-6'>
      {isLoading ? (
        <Skeleton className='w-full h-[150px] mb-6 rounded-lg' />
      ) : (
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
            Fast, Low-Cost, and Secure Transactions Powered by Solana
            Blockchain. Track and Manage Your Orders with Ease.
          </p>
        </div>
      )}

      <Tabs defaultValue='sol' className='w-full'>
        <TabsList className='mb-4'>
          <TabsTrigger value='sol'>Solana</TabsTrigger>
          <TabsTrigger value='eth'>Ethereum</TabsTrigger>
          <TabsTrigger value='base'>Base</TabsTrigger>
        </TabsList>

        {['sol', 'eth', 'base'].map((chain) => (
          <TabsContent key={chain} value={chain}>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Show 5 skeleton rows while loading
                    [...Array(5)].map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))
                  ) : history?.[chain]?.length > 0 ? (
                    history[chain].map((tx) => (
                      <TableRow key={tx.txID}>
                        <TableCell className='font-medium'>
                          {format(new Date(tx.dateTime), 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell className='font-mono'>
                          <a
                            href={`https://solscan.io/tx/${tx.txID}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:text-blue-800'
                          >
                            {truncateHash(tx.txID)}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tx.direction === 'in' ? 'default' : 'secondary'
                            }
                          >
                            {tx.direction === 'in' ? 'Received' : 'Sent'}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right ${
                            tx.direction === 'in'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {formatAmount(tx.amount, tx.direction)}{' '}
                          {chain.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className={getStatusBadge(tx.status)}
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='text-center text-muted-foreground'
                      >
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default History;
