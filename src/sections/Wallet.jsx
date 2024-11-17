import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../component/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../component/ui/tabs';
import { Skeleton } from '../component/ui/Skeleton';
import { FaPlus, FaArrowUp, FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { FaLinode } from 'react-icons/fa';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetUserBalance } from '../libs/builder/user/queries';

const Wallet = ({ userInfo }) => {
  const userEmail = userInfo?.data?.userInfo?.email;
  const userID = userInfo?.data?.userInfo?.id;
  const { data: balanceResponse, isLoading } = useGetUserBalance(userID);

  // Access the correct data path
  const balances = balanceResponse?.data?.data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatCrypto = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(amount);
  };

  const getTotalBalance = () => {
    return (
      (balances?.eth?.totalUsd || 0) +
      (balances?.sol?.totalUsd || 0) +
      (balances?.base?.totalUsd || 0)
    );
  };

  return (
    <div className='p-6 space-y-6'>
      <Tabs defaultValue='overview' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='eth'>Ethereum</TabsTrigger>
          <TabsTrigger value='sol'>Solana</TabsTrigger>
          <TabsTrigger value='base'>Base</TabsTrigger>
        </TabsList>

        <TabsContent value='overview'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {/* Total Balance Card */}
            <Card className='col-span-2'>
              <CardHeader>
                <CardTitle>Total Balance</CardTitle>
                <CardDescription>Your total portfolio value</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className='h-[200px]' />
                ) : (
                  <div className='space-y-8'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-4xl font-bold'>
                          {formatCurrency(getTotalBalance())}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Total Value in USD
                        </p>
                      </div>
                      <div className='flex items-center space-x-2 text-green-500'>
                        <FaArrowUp />
                        <span>+12.5%</span>
                      </div>
                    </div>

                    <ResponsiveContainer width='100%' height={200}>
                      <AreaChart
                        data={[
                          { name: 'ETH', value: balances?.eth?.totalUsd || 0 },
                          { name: 'SOL', value: balances?.sol?.totalUsd || 0 },
                          {
                            name: 'BASE',
                            value: balances?.base?.totalUsd || 0,
                          },
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id='total'
                            x1='0'
                            y1='0'
                            x2='0'
                            y2='1'
                          >
                            <stop
                              offset='5%'
                              stopColor='#0463CA'
                              stopOpacity={0.8}
                            />
                            <stop
                              offset='95%'
                              stopColor='#0463CA'
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => formatCurrency(value)}
                          labelStyle={{ color: '#666' }}
                        />
                        <Area
                          type='monotone'
                          dataKey='value'
                          stroke='#0463CA'
                          fillOpacity={1}
                          fill='url(#total)'
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used operations</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <button className='flex items-center justify-between p-2 text-sm bg-primary/5 rounded-md hover:bg-primary/10'>
                  <span className='flex items-center gap-2'>
                    <FaPlus className='text-primary' />
                    Buy Crypto
                  </span>
                  <FaArrowRight className='text-primary' />
                </button>
                <button className='flex items-center justify-between p-2 text-sm bg-primary/5 rounded-md hover:bg-primary/10'>
                  <span className='flex items-center gap-2'>
                    <BiTransfer className='text-primary' />
                    Transfer
                  </span>
                  <FaArrowRight className='text-primary' />
                </button>
                <button className='flex items-center justify-between p-2 text-sm bg-primary/5 rounded-md hover:bg-primary/10'>
                  <span className='flex items-center gap-2'>
                    <FaLinode className='text-primary' />
                    Withdraw
                  </span>
                  <FaArrowRight className='text-primary' />
                </button>
              </CardContent>
            </Card>

            {/* Asset Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Distribution</CardTitle>
                <CardDescription>Portfolio breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className='h-[200px]' />
                ) : (
                  <div className='space-y-4'>
                    {['eth', 'sol', 'base'].map((chain) => {
                      const total = getTotalBalance();
                      const percentage =
                        total > 0
                          ? (
                              ((balances?.[chain]?.totalUsd || 0) / total) *
                              100
                            ).toFixed(1)
                          : '0';

                      return (
                        <div key={chain} className='space-y-2'>
                          <div className='flex justify-between text-sm'>
                            <span className='capitalize'>{chain}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className='h-2 bg-primary/10 rounded-full overflow-hidden'>
                            <div
                              className='h-full bg-primary transition-all duration-500'
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Individual Chain Cards */}
            {['eth', 'sol', 'base'].map((chain) => (
              <Card key={chain}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium capitalize'>
                    {chain === 'eth'
                      ? 'Ethereum'
                      : chain === 'sol'
                      ? 'Solana'
                      : 'Base'}
                  </CardTitle>
                  <div
                    className={`rounded-full p-2 ${
                      balances?.[chain]?.totalUsd > 0
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {balances?.[chain]?.totalUsd > 0 ? (
                      <FaArrowUp className='text-green-600' />
                    ) : (
                      <FaArrowDown className='text-red-600' />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className='h-12 w-[200px]' />
                  ) : (
                    <div className='space-y-2'>
                      <div className='text-2xl font-bold'>
                        {formatCurrency(balances?.[chain]?.totalUsd || 0)}
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {formatCrypto(
                          balances?.[chain]?.nativeTokenAmount || 0
                        )}{' '}
                        {chain.toUpperCase()}
                      </p>
                      <div className='h-1 bg-primary/10 rounded-full'>
                        <div
                          className='h-full bg-primary rounded-full transition-all duration-500'
                          style={{
                            width: `${
                              balances?.[chain]?.nativeTokenBalanceUsd > 0
                                ? 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Individual Chain Tabs */}
        {['eth', 'sol', 'base'].map((chain) => (
          <TabsContent key={chain} value={chain}>
            <Card>
              <CardHeader>
                <CardTitle className='capitalize'>
                  {chain === 'eth'
                    ? 'Ethereum'
                    : chain === 'sol'
                    ? 'Solana'
                    : 'Base'}{' '}
                  Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {isLoading ? (
                  <Skeleton className='h-[200px]' />
                ) : (
                  <>
                    <div className='space-y-2'>
                      <h3 className='text-sm font-medium'>Balance</h3>
                      <div className='text-3xl font-bold'>
                        {formatCurrency(balances?.[chain]?.totalUsd || 0)}
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {formatCrypto(
                          balances?.[chain]?.nativeTokenAmount || 0
                        )}{' '}
                        {chain.toUpperCase()}
                      </p>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                      <Card className='p-4 text-center cursor-pointer hover:bg-accent transition-colors'>
                        <FaPlus className='mx-auto mb-2' />
                        <p className='text-sm'>Buy</p>
                      </Card>
                      <Card className='p-4 text-center cursor-pointer hover:bg-accent transition-colors'>
                        <BiTransfer className='mx-auto mb-2' />
                        <p className='text-sm'>Transfer</p>
                      </Card>
                      <Card className='p-4 text-center cursor-pointer hover:bg-accent transition-colors'>
                        <FaLinode className='mx-auto mb-2' />
                        <p className='text-sm'>Withdraw</p>
                      </Card>
                    </div>

                    {balances?.[chain]?.tokens?.length > 0 ? (
                      <div className='space-y-2'>
                        <h3 className='text-sm font-medium'>Tokens</h3>
                        {balances[chain].tokens.map((token, index) => (
                          <Card key={index} className='p-4'>
                            <div className='flex justify-between'>
                              <span>{token.symbol}</span>
                              <span>{formatCrypto(token.amount)}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className='p-4 text-center text-muted-foreground'>
                        No tokens found
                      </Card>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Wallet;
